'use strict';

function logA() {
    console.log('function logA called');
}

var enterfile = logA();//ES6代码，rollup打包后无法直接在浏览器或node上运行

module.exports = enterfile;
