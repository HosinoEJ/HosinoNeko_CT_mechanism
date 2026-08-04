const fs = require("fs");

// 数据文件
const file = "./data.json";

// 需要添加 tag 的 id
const ids = [
1771498662355,1771498662387,1771498662730,1771498663184,1773447790346,1773447791034
];

// 要添加的新 tag
const newTag = "Apria:非法办学直接证据";

// 读取 JSON
const data = JSON.parse(fs.readFileSync(file, "utf8"));

let count = 0;

data.forEach(item => {
  if (ids.includes(item.id)) {
    // 防止重复添加
    if (!item.tags.includes(newTag)) {
      item.tags.push(newTag);
      count++;
    }
  }
});

// 写回文件
fs.writeFileSync(
  file,
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log(`完成，修改 ${count} 个图片`);