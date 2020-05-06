(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.res = factory());
}(this, (function () { 'use strict';

    function logA() {
        console.log('function logA called and changed');
    }

    var enterfile = logA();//ES6代码，rollup打包后无法直接在浏览器或node上运行，可以通过配置转化成其它形式的dist

    return enterfile;

})));
