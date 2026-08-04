const fs = require("fs");
const path = require("path");


// 搜索结果 JSON
const dataFile = "./searched_result.json";

// 图片目录
const imageDir = "./searched_Images";


// 读取 JSON
const images = JSON.parse(
    fs.readFileSync(dataFile, "utf8")
);


// 清理文件名非法字符
function safeFilename(name) {

    return name.replace(/[\\/:*?"<>|]/g, "_");

}



images.forEach(item => {

    const oldName = item.filename;

    const ext = path.extname(oldName);

    const newName = safeFilename(item.title) + ext;


    const oldPath = path.join(
        imageDir,
        oldName
    );


    const newPath = path.join(
        imageDir,
        newName
    );


    if (!fs.existsSync(oldPath)) {

        console.log(
            "不存在:",
            oldPath
        );

        return;

    }


    // 防止同名覆盖
    if (fs.existsSync(newPath)) {

        console.log(
            "已存在，跳过:",
            newName
        );

        return;

    }


    fs.renameSync(
        oldPath,
        newPath
    );


    console.log(
        `${oldName} -> ${newName}`
    );

});


console.log("改名完成");