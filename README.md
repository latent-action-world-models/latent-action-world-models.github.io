# UWM 项目网站

**A Universal World Model Learned from Large Scale and Diverse Videos** — Hanchen Cui、Yang Gao。

网站使用原生 HTML、CSS 和 JavaScript，字体与素材均保存在本地，无需安装依赖或构建。

## 预览

在项目根目录运行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 <http://localhost:8000>。也可以直接打开 `index.html`；通过本地服务器预览可获得更好的剪贴板支持。

## 目录

```text
index.html                 页面内容与入口
favicon.ico                浏览器图标的根路径回退
assets/
  style.css                按页面区域组织的样式与响应式规则
  main.js                  按功能拆分的交互初始化函数
  figures/                 论文图表：WebP 展示图、PNG 原图
  examples/ssv2/           Something-Something-v2 的 5 组实验帧
  examples/ego4d/          Ego4D 的 5 组实验帧
  documents/               论文 PDF、海报 PNG
  icons/                   透明项目图标、16px/32px favicon
  fonts/                   使用中的本地字体及许可证
  README.md                素材来源与命名说明
scripts/
  check_site.py            本地链接、资源与论文校验
  export_site.py           校验并导出独立网站
  README.md                脚本使用说明

docs/content-notes.md      内容来源与数值口径
.nojekyll                  GitHub Pages 配置

# 以下目录仅保留在本地，不进入 Git 或网站导出包
local/inputs/              用户提供的原始 PDF、ZIP、海报和图标
local/reference/           解压后的论文资料与参考网页
local/unused-assets/       归档的旧图标、未使用字体
build/site/                生成的可部署网站
build/uwm-website.zip       生成的独立网站压缩包
build/previews/            浏览器检查截图
build/archives/            整理前的导出包
build/deploy/              Sites 部署归档
project-site/              已有的私有 Sites 部署仓库
```

根目录是网站的源文件，`build/site/` 和 `project-site/dist/` 是生成或同步的副本。日常修改请在根目录进行。

## 修改内容

- 文案、作者链接、论文与海报链接、表格、BibTeX：`index.html`。
- 字体、颜色、布局与移动端样式：`assets/style.css`。
- 摘要展开、实验切换、图片弹窗、复制引用、导航状态：`assets/main.js` 中对应的 `init…` 函数。
- 替换素材时同步更新 HTML 或 JavaScript 中的路径。实验帧按“样例编号－帧类型”命名，见 [素材说明](assets/README.md)。

摘要与完整论文图表在 JavaScript 不可用时仍然可读。网站支持部署在域名根目录或子路径。

## 检查与导出

```bash
python3 scripts/check_site.py
python3 scripts/export_site.py
python3 scripts/check_site.py build/site
```

导出脚本先检查源文件，再检查临时生成的网站，通过后替换 `build/site/` 和 `build/uwm-website.zip`。压缩包的根目录就是 `index.html`，仅包含网站运行所需的文件。

部署到 GitHub Pages 或静态托管服务时，上传 `build/site/` 的内容。脚本的检查范围及编辑后的手工验证步骤见 [scripts/README.md](scripts/README.md)。

页面布局参考 [DreamSteer](https://dream-steer.github.io/) 与本地 `~/projects/PILOT_website`；页脚保留 DreamSteer 的布局署名。
