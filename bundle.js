(function (d3) {
  'use strict';

  const body = d3.select('body');

  const kilobytes= data => Math.ceil(d3.csvFormat(data).length/1024);

  //d3的csv函数发起一个对data.csv文件的xml http请求，将data.csv中的字符串载入并解析成一个对象数组
  //每个对象的key表示columns，value表table中的具体值
  d3.csv('data.csv').then(data=>{
    body
      .append('pre')
        .text([
          `${data.length} rows`,
          `${Object.keys(data[0]).length} columns`,
          `${kilobytes(data)} KB`
        ].join(','));
    body
      .append('pre')
        .text('First 10 rows:');
    body
      .append('pre')
        .text(JSON.stringify(data.slice(0,10),null,2));
  });//csv('')返回一个Promise，当data加载进来时解决（resolve）

}(d3));
