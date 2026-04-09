# 简易网页编辑器（Editor Project）

这是一个零依赖的前端编辑器项目，使用 **HTML + CSS + JavaScript** 实现。

## 功能

- 新建文档（清空编辑区）
- 打开本地 `.txt/.md` 文件
- 保存当前内容到本地文件
- 撤销 / 重做（依赖浏览器原生 `execCommand`）
- 字数统计（字符数、单词数、行数）
- 深色/浅色主题切换
- 自动保存到 `localStorage`

## 快速开始

直接双击 `index.html` 即可运行，或使用任意静态服务器：

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```

## 项目结构

```text
.
├── index.html
├── styles.css
├── app.js
└── README.md
```

## 说明

- 该项目定位为练习/演示用途。
- `document.execCommand('undo'/'redo')` 在部分浏览器可能逐步废弃；如果遇到兼容性问题，可改为自行实现历史栈。
