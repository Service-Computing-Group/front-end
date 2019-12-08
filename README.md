前端项目搭建使用Vue框架，具体安装方法如下：

1. 安装node.js

   [网址](http://nodejs.cn)

   安装好后，可以使用`node -v 检查是否安装成功。

2. 使用镜像安装npm，在这里推荐使用淘宝npm镜像

    `npm install -g cnpm --registry=https://registry.npm.taobao.org`

3. 安装全局使用vue-cli脚手架

   `cnpm install --global vue-cli`

   安装完成后，在命令输入vue，出现`vue`信息说明安装成功。

4. 安装依赖

   `cd 目标文件夹`

   `npm install`

5. 启动服务运行

   `npm run dev`

6. 可能需要安装的依赖

   npm install vue-cookies --save

   npm install vue-resource --save