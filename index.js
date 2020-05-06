import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';//后面就不需要d3.select

const svg = select('svg');

const height=parseFloat(svg.attr('height'));//这里attr返回的是string类型，html中的属性值都是string类型的，DOM就是这样定义的
const width=+svg.attr('width');//隐式类型转换

const render=data =>{
  const xValue=d=>d.population;//这样写以后改变属性容易
  const yValue=d=>d.country;
  const margin={top:20,right:20,bottom:20,left:80};
  const innerWidth=width-margin.left-margin.right;
  const innerHeight=height-margin.top-margin.bottom;
  //以下代码和某一特定数据集无关
  const xScale=scaleLinear()
    .domain([0,max(data,xValue)])
    .range([0,innerWidth]);

  const yScale=scaleBand()//scaleband用于ordinal的值
    .domain(data.map(yValue))//y轴是所有国家的值
    .range([0,innerHeight])
    .padding(0.1);

  const g=svg.append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`);

  g.append('g').call(axisLeft(yScale));
  g.append('g').call(axisBottom(xScale))
    .attr('transform',`translate(0,${innerHeight})`);

  g.selectAll('rect').data(data)//创建D3 data join
    .enter().append('rect')
      .attr('y',d=>yScale(yValue(d)))
      .attr('width',d=>xScale(xValue(d)))
      .attr('height',yScale.bandwidth());//bandwidth是一个bar的宽度计算值
};

//d3的csv函数发起一个对data.csv文件的xml http请求，将data.csv中的字符串载入并解析成一个对象数组
//每个对象的key表示columns，value表table中的具体值
csv('data.csv').then(data=>{
  data.forEach(d => {
    d.population = +d.population*1000;
  });
  render(data);
});//csv('')返回一个Promise，当data加载进来时解决（resolve）
