---
previousText: '全局布局'
previousUrl: '/tutorial/layout'
nextText: '导航到页面'
nextUrl: '/tutorial/navigation'
disableHtmlPreviews: true
---

# 添加页面

## 添加教程需要的页面

根据上一节课的布局，我们需要用到三个页面，英雄页面，局内道具页面，召唤师技能页面。

所以我们使用 `alita g pages` 新建我们需要的三个页面。

```bash
$ alita g pages hero
  Write: src/pages/hero/index.tsx
  Write: src/pages/hero/index.less
  Write: src/models/hero.ts

$ alita g pages item
? Do you want to use typescript? Yes
  Write: src/pages/item/index.tsx
  Write: src/pages/item/index.less
  Write: src/models/item.ts

$ alita g pages summoner
  Write: src/pages/summoner/index.tsx
  Write: src/pages/summoner/index.less
  Write: src/models/summoner.ts
```

**备注**

**`pc` 新建页面后会有 `You should config the routes in config.routes manunally since config.routes exists` 提示。**

**`pc` 端路由在 `config/config.ts` 下自己配置，在王者荣耀的 demo 中，请先注释 `routes` 的配置。**

```js
export default {
  appType: 'pc',
  locale: {},
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/BasicLayout',
  //     routes: [
  //       {
  //         path: '/',
  //         name: 'index',
  //         icon: 'smile',
  //         component: './index/index',
  //       },
  //     ],
  //   },
  // ],
};
```

页面创建成功，启动开发服务器(这是我们最后一次演示，如何启动umi开发服务器)。

```bash
$ yarn start
Compiling
✔ success webpack compiled in 3s 754ms
 DONE  Compiled successfully in 3761ms                                                 19:40:39
  App running at:
  - Local:   http://localhost:8000/ (copied to clipboard)
  - Network: http://192.168.199.195:8000/
```

启动完成，我们可以通过直接访问路由的方式，访问页面。 `http://localhost:8000/summoner` 、`http://localhost:8000/hero`、`http://localhost:8000/item`。