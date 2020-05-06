define(function () { //amd模块打包方式没指定模块名称就打包成匿名函数
  'use strict';

    function logA() {
        console.log('function logA called');
    }

    var enterfile = logA();//ES6代码，rollup打包后无法直接在浏览器或node上运行

    return enterfile;

});
