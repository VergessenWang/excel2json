[在线地址](http://wallenwang.gitee.io/excel2json-online/) --- 有时可能未同步部署更新，或者由于是静态部署的，需要手动刷新获取最新页面

![](https://blog-picture-wallen.oss-cn-hangzhou.aliyuncs.com/2020/12/30/pic1.png)

基本功能
+ 可以通过选择或者拖拽的方式，上传.xls或.xlsx文件进行转换
+ 支持多sheet同时转换，但是每个sheet只能放一张表，且列头在第一行
+ 可以切换json的级数，控制展开层次，多sheet时折叠好用
+ json一键格式化复制


![](https://blog-picture-wallen.oss-cn-hangzhou.aliyuncs.com/2021/01/06/pic2.png)

高级功能
+ 每个sheet中的表都可以生成对应的api建议，其中name取自表名，url通过调用百度翻译api接口拼接而来，response主要提供复制。该功能旨在快速建立rap2等mock接口

后续更新及Bug修复
+ 【2021/01/06】在生成建议的name和url旁添加copy按钮进行复制，是的，就是这莫懒，甚至都不想选中按ctrl+c...
+ 【2021/01/07】优化url格式: 当sheet名中含有特殊符号时，生成的url时要进行过滤。去掉中文的转义字符和特殊字符，并对英文全部转为小写。
+ 【2021/01/07】json时间类型转换问题: excel中的日期类型会被转为4xxxx形式的值，需要进行回转。调试中发现，如E3: {t: "n", v: 43861, w: "1/31/20"} 日期会被转为数值，且形如2020/1/20 会被默认转为mm/dd/yy格式。通过一定的匹配后进行时间格式的转换, 中间遇到了有的时间会莫名其妙多一天的情况，后来发现是1900的2月29号导致的。[参考链接](https://blog.csdn.net/qq_40662765/article/details/109326067?utm_medium=distribute.pc_relevant.none-task-blog-OPENSEARCH-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-OPENSEARCH-1.control)。由于是通过时间戳进行转换的，不管 2020年1月20日 -或者- 2020/1/31 12:00AM -或者- 2001/12/31 -或者- 1/20/20 形式的时间，都会被统一转为 yyyy/mm/dd 的格式，只精确到日



借助第三方库
+ element-ui的upload: 实现文件上传
+ xlsx: 实现文件转换
+ vue-json-viewer: 实现json格式化和复制
+ 百度翻译api实现url自动生成
+ vue-clipboard2: 实现复制内容到剪贴板


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

