(function (d3) {
  'use strict';

  const body = d3.select('body');

  const height=parseFloat(svg.attr('height'));//这里attr返回的是string类型，html中的属性值都是string类型的，DOM就是这样定义的
  const width=+svg.attr('width');//隐式类型转换

  const render=data =>{
    const xValue=d=>d.population;//这样写以后改变属性容易
    const yValue=d=>d.country;
    const margin={top:50,right:20,bottom:55,left:120};
    const innerWidth=width-margin.left-margin.right;
    const innerHeight=height-margin.top-margin.bottom;
    //以下代码和某一特定数据集无关
    const xScale=d3.scaleLinear()
      .domain([0,d3.max(data,xValue)])
      .range([0,innerWidth]);

    const yScale=d3.scaleBand()//scaleband用于ordinal的值
      .domain(data.map(yValue))//y轴是所有国家的值
      .range([0,innerHeight])
      .padding(0.1);

    const g = svg.append('g')
      .attr('transform',`translate(${margin.left},${margin.top})`);

    const xAxisTickFormat= number =>
      d3.format(".3s")(number).replace('G','B');//自定义格式，为了将G换成B

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);

    g.append('g')//横纵坐标轴是g上又添加的子元素g，所以Margin只是中间图形区域的margin
      .call(d3.axisLeft(yScale))
      .selectAll('.domain,.tick line')//选择多个可以写在一起，而且可以按css规则选
      .remove();

    const xAxisG = g.append('g').call(xAxis)
      .attr('transform',`translate(0,${innerHeight})`);

      xAxisG.select('.domain')//这部分要独立出来，才能让xAxisG是代表横坐标的group
      .remove();

      xAxisG.append('text')
        .attr('class','axis-label')//便于在css里选择
        .attr('y',40)//将文字上移10个pixels
        .attr('x',innerWidth/2)
        .attr('fill','black')//坐标轴的g默认设置了fill=none，为什么？
        .text('Population');

    g.selectAll('rect').data(data)//创建D3 data join
      .enter().append('rect')
        .attr('y',d=>yScale(yValue(d)))
        .attr('width',d=>xScale(xValue(d)))
        .attr('height',yScale.bandwidth());//bandwidth是一个单独bar的宽度计算值

    g.append('text')
      .attr('class','title')
      .attr('y',-10)//将文字上移10个pixels
      .text('Top 10 Most Populous Countries');
  };

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
