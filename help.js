console.log('命令行帮助:');
console.log(`
用法:

npm run <script> <参数>
------------------------------

脚本列表:

npm run dev
启动服务器，默认监听 3000 端口。

npm run update
请先将照片放入 public/image 目录，然后运行此命令以更新数据库和生成缩略图。

npm run addTag
请先在 addTag.js 中的ids、newTag变量中设置要添加的图片id和标签，然后运行此命令以批量添加标签。

npm run searchImage <Tag或者id>
检索指定标签或id的图片，并将结果输出到 searched_Images 目录中。

npm run help
获取帮助

------------------------------

`)