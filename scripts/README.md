# 检查与导出

两个脚本均仅依赖 Python 3 标准库，可从任意工作目录运行。默认使用脚本所在仓库作为源目录。

```bash
python3 scripts/check_site.py
python3 scripts/export_site.py
python3 scripts/check_site.py build/site
```

`check_site.py` 检查重复 HTML ID、本地链接和锚点、ARIA 引用、CSS 资源、50 张实验帧、论文 PDF 和部署文件。原始论文存在于 `local/inputs/paper/` 时，还会校验发布副本的 SHA-256。

`export_site.py` 复用上述检查，将 `index.html`、`favicon.ico`、`.nojekyll` 和 `assets/` 中除 Markdown 说明外的文件复制到临时目录，验证成功后替换：

- `build/site/`：可直接部署的网站。
- `build/uwm-website.zip`：根目录包含 `index.html` 的便携压缩包。

脚本不会导出本地原始资料、预览截图、文档、脚本或 Sites 部署仓库。源目录或临时导出目录检查失败时，已有导出结果会保留。

修改路径或交互后，还应在浏览器检查桌面与移动端布局、摘要展开、两个数据集的样例切换、图片弹窗和 BibTeX 复制。资源检查不执行 JavaScript，也不验证外部网站的可用性。
