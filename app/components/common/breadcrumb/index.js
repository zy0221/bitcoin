import React from 'react'
import './index.less'

function createCrumb(path) {
    if(!path || path.length === 0 ){
        return null;
    }
    const doms = [];
    for (var i = 0; i < path.length - 1; i++) {
        const item = path[i];
        if(item.url){
            doms.push(<a href={item.url} key={`${i}_${item.name}`}>
                <span className="crumb clickable">{item.name}</span>
            </a>);
        }else {
            doms.push(<span className="crumb" key={`${i}_${item.name}`}>{item.name}</span>);
        }
        doms.push(<span className="space" key={`${i}/${item.name}`}>/</span>);
    }
    const last = path[path.length - 1];
    doms.push(<span className="active" key={`${i}_${last.name}_${last.url}`}>{last.name}</span>);
    return doms;
}

export default (props) => (
    <div className="bt-com-breadcrumb bt-layout-page-center">
        {createCrumb(props.path)}
    </div>
);