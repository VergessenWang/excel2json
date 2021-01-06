[在线地址](http://wallenwang.gitee.io/excel2json-online/) --- 有时可能未同步部署更新

![](https://blog-picture-wallen.oss-cn-hangzhou.aliyuncs.com/2020/12/30/pic1.png)

基本功能
+ 可以通过选择或者拖拽的方式，上传.xls或.xlsx文件进行转换
+ 支持多sheet同时转换，但是每个sheet只能放一张表，且列头在第一行
+ 可以切换json的级数，控制展开层次，多sheet时折叠好用
+ json一键格式化复制


![](https://blog-picture-wallen.oss-cn-hangzhou.aliyuncs.com/2021/01/06/20210106223605.png)

高级功能
+ 每个sheet中的表都可以生成对应的api建议，其中name取自表名，url通过调用百度翻译api接口拼接而来，response主要提供复制。该功能旨在快速建立rap2等mock接口

后续更新
+ 【2021/01/06】在生成建议的name和url旁添加copy按钮进行复制，是的，就是这莫懒，甚至都不想选中按ctrl+c...

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

