# 体育场馆预订系统消息页

这是一个无后端、零构建的静态前端复刻页，可直接放到 GitHub Pages 部署。

## 本地打开

直接双击 `index.html`，或用浏览器打开本目录下的 `index.html`。

## 页面规则

- 系统消息发送时间固定显示为 `12:50`。
- 四条消息固定为：前一天游泳池 16:30、前一天健身房 16:00、当天游泳池 16:30、当天健身房 16:00。
- 预约日期会根据打开页面时浏览器的当天日期自动变化。

## GitHub Pages 快速部署

1. 在 GitHub 新建一个仓库。
2. 上传本目录里的 `index.html`、`styles.css`、`app.js`、`README.md` 和 `.github/workflows/pages.yml`。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `GitHub Actions`。
5. 回到 `Actions` 等待 `Deploy static site to Pages` 完成。
6. 部署成功后，GitHub 会在 `Settings` -> `Pages` 显示访问链接。
