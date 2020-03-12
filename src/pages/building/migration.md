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

### 升级全局 alita 版本

在终端上执行：

```bash
npm install -g alita
```

或者

```bash
yarn global add alita
```

执行后输入 `alita -v` 确认 `alita` 版本已成功升级为 `2.x`。

### package.json

修改 `alita` 的版本为 ^2.0.0 或以上，

```json
{
  "dependencies": {
-   "alita": "^1"
+   "alita": "^2.1.6"
  }
}
```

> 如果有使用 `@alitajs/alita-layout`，需要升级到 2.0.4+。

### 替换 router

如果有引用 `umi/router`,可以通过开发者工具全局搜索替换。

```diff
- import router from 'umi/router';
+ import { router } from 'alita';
```

> 注意：react-route 现在推荐直接使用 history，用法与 router 相同，并且可以还可以从 props.history。建议在新项目或者新页面中使用 history，你也可以继续使用 router，旧项目 router 的用法会持续兼容。

### tsconfig.json

typescript 中为了有更好的 ts 提示，需配置 `@@` 为 `["src/.umi/*"]`。

> javascript 中无需这一步

```json
{
  "paths": {
    "@/*": ["./src/*"],
+   "@@/*": ["src/.umi/*"]
  }
}
```

### 遇到问题

Alita v2 做了非常多的细节改进和重构，我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [Github issues](https://github.com/alitajs/alita/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。

### FAQ

1、Alita 中找不到 Qrcode？

```diff
- import { Qrcode } from 'alita';
+ import Qrcode from 'qrcode.react';
```

1、想在页面级别修改 NavBar 怎么做？

可以使用 `mobileLayout` 配置。旧的项目如何使用，可参照以下说明。
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

删除 `package.json` 里面的 `@alitajs/alita-layout` 依赖，避免多个版本冲突。
