---
previousText: '脚手架'
previousUrl: '/building/scaffolding'
nextText: '跨平台'
nextUrl: '/building/cross-platform'
contributors:
  - mhartington
  - kensodemann
  - elylucas
---

# 迁移指南

## 从 Alita 1.0 迁移到 Alita 2.0

本文档将帮助你从 Alita 1.x 版本升级到 Alita 2.x 版本。

### package.json

修改 `alita` 的版本为 ^2.0.0 或以上，

```json
{
  "dependencies": {
-   "alita": "^1"
+   "alita": "^2"
  }
}
```

### tsconfig.json

为了有更好的 ts 提示，需配置 `@@` 为 `["src/.umi/*"]`。

```json
{
  "paths": {
    "@/*": ["./src/*"],
+   "@@/*": ["src/.umi/*"]
  }
}
```

### mobileLayout

如果你的项目 在 `src/layouts/index.tsx` 中使用到 `@alitajs/alita-layout` 的配置, 那么可以将 `layout` 布局配置放到 `src/app` 下。

#### config/config.ts

```json
{
  "appType": "h5",
  "mobileLayout": true
}
```

#### src/app

需要将 `src/layout/index` 下的 `Layout` 内容拷贝到 `app.js` 下即可：

```js
const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList
};

export { mobileLayout };
```

删除 `src/layout` 文件夹。

### 遇到问题

Alita v2 做了非常多的细节改进和重构，我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [Github issues](https://github.com/alitajs/alita/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
