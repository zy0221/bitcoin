const path = require('path')
const fs = require('fs');
const del = require('del')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const args = process.argv.slice(2)
const DEBUG = !(args[0] === '--release')


if(!DEBUG){
    del(['./build/*', '!./build/.git'], { dot: true })
}

function getAllFiles(dir, ids = []) {
    let ret = [];
    fs.readdirSync(dir).forEach((filename) => {
        if(filename.substring(0,1) !== '.'){
            const filePath = path.resolve(dir, filename);
            const fileStat = fs.statSync(filePath);
            if(fileStat.isFile()){
                ids.push(filename.split('.')[0]);
                ret.push({
                    ids: ids.join('_'),
                    path: filePath
                });
            }else if(fileStat.isDirectory()){
                const childIds = ids.slice(0);
                childIds.push(filename);
                ret = ret.concat(getAllFiles(filePath, childIds));
            }
        }
    })
    return ret;
}

const allEntry = getAllFiles(path.resolve(__dirname, './app/entries'));


const entry = (function () {
    const entries = {};
    allEntry.forEach((item) => {
        entries[item.ids] = item.path;
    })
    entries.common = [
        'es5-shim',
        'es5-shim/es5-sham',
        'es6-promise',
        'babel-polyfill',
        'fetch-detector',
        'fetch-ie8',
        'fetch-jsonp',
        'react',
        'react-dom',
        'redux',
        'redux-thunk',
        './app/less/base/index.less',
    ]
    entries.base = [
        './app/base/index',
    ]
    return entries;
})();

const output = {
    path: path.resolve(__dirname, 'build'),
    publicPath: DEBUG ? 'http://127.0.0.1:8080/' : './',
    filename: '[name].js',
    chunkFilename: '[name].js',
};

const webpackModule = {
    loaders: [
        {
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, './app'),
            ],
            loader: 'babel-loader',
            query: {
                plugins: [],
            },
        },
        {
            test: /\.css/,
            loader: ExtractTextPlugin.extract(
                'style-loader',
                'css-loader?-autoprefixer&modules=true&localIdentName=[local]!postcss-loader'
            ),
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                'less-loader',
                'css-loader?-autoprefixer!postcss-loader!less-loader'
            ),
        },
        {
            test: /\.json$/,
            loader: 'json-loader',
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader',
            query: {
                name: '[path][name].[ext]',
                limit: 5000,
            },
        },
        {
            test: /\.(eot|ttf|wav|mp3|ogg)$/,
            loader: 'file-loader',
            query: {
                name: '[path][name].[ext]',
            },
        },
    ],
};



const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    /*new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity,
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
        names: ['common', 'base'], // ps: base end, webpackJsonp define
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
        __DEV__: DEBUG,
    }),
    new ExtractTextPlugin(
        '[name].css',
        {
            minimize: !DEBUG,
            allChunks: true,
        }
    ),
];


function chunksSortFun(chunk1, chunk2) {
    const orderMap = {
        'base': 100,
        'common': 99,
    }
    var order1 = orderMap[chunk1.names[0]] || 0;
    var order2 = orderMap[chunk2.names[0]] || 0;
    return order2 - order1;
}

allEntry.forEach((item) => {
    const newHtml = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './app/index.html'),
            filename: `${item.ids}.html`,
            chunks: ['base','common', item.ids],
            chunksSortMode: chunksSortFun,
        });
    plugins.push(newHtml);
});
// 首页
plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './app/index.html'),
    filename: 'index.html',
    chunks: ['base','common','trade_index'],
    chunksSortMode: chunksSortFun,
}));

const deServer = {
    hot: true,
    inline: true,
    proxy: {
        '/21BitCoinSer/*': {
            target: 'http://192.168.9.25:8080',
            secure: false
        }
    },
    watchContentBase: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    stats: {
        colors: true
    },
};

const config ={
    entry,
    output,
    deServer,
    module: webpackModule,
    plugins
};

if (!DEBUG) {
    config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,  // remove all comments
        },
        compress: {
            warnings: false
        }
    })),
    config.module.loaders
        .find(x => x.loader === 'babel-loader').query.plugins
        .unshift(
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'transform-es3-modules-literals',
            'transform-es3-member-expression-literals',
            'transform-es3-property-literals'
        )
}


module.exports = config;

