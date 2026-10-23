# 网站素材

所有运行资源均保存在本地。此说明文件不进入导出包。

| 目录 | 内容与来源 |
| --- | --- |
| `figures/` | 来自提供的论文资料；同名 WebP 用于页面展示，PNG 用于放大查看和下载。 |
| `examples/ssv2/`、`examples/ego4d/` | 从论文 Figure 3 裁出的实验帧，每个数据集 5 组，每组 5 帧。 |
| `documents/paper.pdf` | 原始论文 PDF 的逐字节副本。 |
| `documents/poster.png` | 用户提供的 `A Universal World Model .png` 的逐字节副本。 |
| `icons/uwm-icon-transparent.png` | 用户提供的 globe 图标的透明背景版本，用于导航栏和 touch icon。 |
| `icons/uwm-favicon-16.png`、`icons/uwm-favicon-32.png` | Chromium 从透明图标渲染出的 16px/32px 位图；根目录 `favicon.ico` 包含这两帧。 |
| `fonts/` | 从本地 PILOT 参考项目复制的 Noto Sans Latin 字体与 SIL Open Font License。 |

实验帧命名为 `{1..5}-{帧类型}.webp`，按以下顺序展示：

1. `observation`：当前观测。
2. `reconstruction`：当前观测的重建。
3. `next-observation`：下一帧观测。
4. `next-reconstruction`：下一帧观测的重建。
5. `prediction`：世界模型预测。

Ego4D 文件编号仍为 1–5，页面显示其对应的论文样例编号 6–10。LPIPS 数值保存在 `main.js` 的 `DATASETS` 中，与论文 Table 1 一致。

原始图标、海报和论文资料保存在 `local/inputs/`。图标去背景的生成记录保存在 `local/inputs/icon-background-removal.md`；旧 SVG 图标、带灰底图标和未使用的字体保存在 `local/unused-assets/`，不随网站发布。
