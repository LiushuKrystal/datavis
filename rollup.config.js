//rollup的配置文件,也用了ES6语法，因为rollup可以自己处理配置文件
//多个文件项的打包通过数组配置
/*
export default [{
  input: 'enterfile.js',//打包的入口文件
  output:{
    format: 'cjs',//要打包成的模块类型
    file: './dist/distA.js'//输出文件的名称路径
  },
},
{
  input:'enterfileB.js',
  output:{
    format:'iife',
    file:'./dist/distB.js',
    name:'fileB'
  }
}
]*/
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'index.js',
  external:['d3'],
  output: [{
      file: 'bundle.js',
      format: 'iife',
      paths:{
        d3:'https://unpkg.com/d3@5.15.0/dist/d3.min.js'
      }
    }
  ],
  plugins:[resolve(),commonjs()]
};
