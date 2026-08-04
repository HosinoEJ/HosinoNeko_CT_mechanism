const fs = require("fs");
const path = require("path");

// 数据
const dataFile = "./data.json";
// 图片目录
const imageDir = "./public/image";
// 输出目录
const outputDir = "./searched_Images";


// 搜索关键词
// 可以是 id，也可以是 tag
const keywords = process.argv[2].split(",");

// 搜索关键词

if (!process.argv[2]) {

    console.log(`
用法:

node searchImage.js <id/tag>

例如:

npm run searchImage.js 1771498662355

或者:

npm run searchImage.js 檔案袋1
`);

    process.exit();
}


// 创建输出目录
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}


// 读取 JSON
const images = JSON.parse(
    fs.readFileSync(dataFile, "utf8")
);


// 搜索
const result = images.filter(item => {

    return keywords.some(keyword => {

        return (
            String(item.id) === keyword ||
            item.tags?.some(tag =>
                tag.includes(keyword)
            )
        );

    });

});



if (result.length === 0) {
    console.log("没有找到匹配图片");
    process.exit();
}



console.log(`找到 ${result.length} 张图片`);


// 复制图片
result.forEach(item => {

    const filename = item.filename;

    const source = path.join(
        imageDir,
        filename
    );


    const target = path.join(
        outputDir,
        filename
    );


    if (fs.existsSync(source)) {

        fs.copyFileSync(
            source,
            target
        );

        console.log(
            "复制:",
            filename
        );

    } else {

        console.log(
            "不存在:",
            source
        );

    }

});


// 保存搜索结果
fs.writeFileSync(
    "./searched_result.json",
    JSON.stringify(result,null,2),
    "utf8"
);


console.log("完成");