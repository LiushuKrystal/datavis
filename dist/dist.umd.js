(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.result = factory());
}(this, (function () { 'use strict';

    function logA() {
        console.log('function logA called');
    }

    var enterfile = logA();//ES6代码，rollup打包后无法直接在浏览器或node上运行

    return enterfile;

})));
