var result = (function () {//所有代码都被打包到一个立即执行的函数中，并且赋值给了一个全局变量
    'use strict';

    function logA() {
        console.log('function logA called');
    }

    var enterfile = logA();//ES6代码，rollup打包后无法直接在浏览器或node上运行

    return enterfile;

}());
