/**
 * Created by zy on 2017/11/25.
 */
export default {
    on: (function () {
        if (document.addEventListener) {
            return function (el, eventName, callback) {
                el.addEventListener(eventName, callback, false);
            }
        } else if (document.attachEvent) {
            return function (el, eventName, callback) {
                el.attachEvent('on' + eventName, callback);
            }
        }
    })(),
    off: (function () {
        if (document.removeEventListener) {
            return function (el, eventName, callback) {
                el.removeEventListener(eventName, callback);
            }
        } else if (document.detachEvent) {
            return function (el, eventName, callback) {
                el.detachEvent('on' + eventName, callback);
            }
        }
    })()
}