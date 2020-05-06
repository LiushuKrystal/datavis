(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const height=parseFloat(svg.attr('height'));//这里attr返回的是string类型，html中的属性值都是string类型的，DOM就是这样定义的
  const width=+svg.attr('width');//隐式类型转换

  const g=svg.append('g')
    .attr('transform',`translate(${width/2},${height/2})`);

  const circle=g.append('circle')
    .attr('r',height/2)
    .attr('fill','yellow')
    .attr('stroke','black');
  //.attr函数传两个参数返回的是调用它的元素，所以可以链式调用,method chain

  const eyeSpacing=100;
  const eyeYoffset=-70;
  const eyeRadius=30;
  const eyeBrowHeight=15;
  const eyeBrowWidth=70;
  const eyeBrowYoffset=-70;

  const eyeG=g.append('g')//eyeG的默认位置是g的定位也就是width/2,height/2
    .attr('fill','black')
    .attr('transform',`translate(0,${eyeYoffset})`);

  const eyebrowG=eyeG
    .append('g')
      .attr('transform',`translate(0,${eyeBrowYoffset})`);
  //因为下面还有对eyebrowG的append操作，所以必须单独拿出来，有append不能用transition
  eyebrowG
    .transition().duration(2000)//transition的第一个参数是以什么为基准移动，可以是x,y,tranform
      .attr('transform',`translate(0,${eyeBrowYoffset-50})`)
    .transition().duration(2000)
      .attr('transform',`translate(0,${eyeBrowYoffset})`);

  const leftEyebrow=eyebrowG
    .append('rect')
      .attr('width',eyeBrowWidth)
      .attr('height',eyeBrowHeight)
      .attr('x',-eyeSpacing-eyeBrowWidth/2);

    const rightEyebrow=eyebrowG.append('rect')
      .attr('width',eyeBrowWidth)
      .attr('height',eyeBrowHeight)
      .attr('x',eyeSpacing-eyeBrowWidth/2);


  const lefteye=eyeG.append('circle')
    .attr('r',eyeRadius)
    .attr('cx',-eyeSpacing);

    const righteye=eyeG.append('circle')
      .attr('r',eyeRadius)
      .attr('cx',+eyeSpacing);


  const mouth=g.append('path')
    .attr('d',d3.arc()({
    innerRadius: 150,
    outerRadius: 170,
    startAngle:Math.PI/2,
    endAngle: Math.PI*3/2//用弧度表示，整个圆的弧度数是2pi
  }
  ));

}(d3));
