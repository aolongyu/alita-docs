---
---

# 配置

Alita 的设计初衷就是面向场景化的方案，所以我们的配置方案，有点偏向于指明是哪个场景下使用。

其实极端一点的做法是提供一个 `appType` 配置，就能够满足所有的需求。

但是考虑到用法上的简便和合理性。

我们提供了几个配置项可供选择。

配置清单如下：

|  配置 | 说明 | 类型 |是否必须 |
|  :-  | :-:  |:-: |:-: |
| appType | 项目类型 | `pc`,`h5`,`cordova`| 是 |
|mobileLayout|开启 mobile layout 的运行时配置模式|boolean|否|
| displayName | 打包时的包名 | string | appType 为 `cordova`时，必须 |
| packageId | 打包时的Bundle Identifier | string | appType 为 `cordova`时，必须 |
| mainPath | 修改路由的主入口，如 `mainPath:'/home'`  | string | 否 |
| native | 调用的原生能力的数组  | string[] | 否,appType 为 `cordova`时才生效 |
| proxy | 配置请求代理  | object | 否，遇到跨域问题可尝试配置 |

## 配置方式

约定 `config/config.ts`  为项目配置文件。

## 配置项

### appType

* Type: `pc`,`h5`,`cordova`

配置项目类型，只支持 `pc`,`h5`,`cordova` 三者之一。
一般开发移动端页面，先配置 `appType:'h5'` 进行开发调试，当需要使用 Cordova 打包，或者需要调试一些原生能力时，将配置改成 `appType:'cordova'`。
详细的如何运行，请查阅[运行预览](/docs/building/running)

### mobileLayout

* Type: boolean

开启 mobile layout 的运行时模式，可以在 `src/app.ts` 中，设置[运行时配置](docs/zh/config/runtime) `mobileLayout`。
还可以在页面中使用 `setPageNavBar` 修改当前页面的 layout。

```tsx
import React, { FC, useEffect } from 'react';
import { setPageNavBar } from 'alita';
const SettingsPage: FC<> = ({ settings, dispatch, location })=>{
  const onLeftClick = () => {
    console.log('click left');
  };
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick,
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
  }, []);
  const { name } = settings;

  return <div className={styles.center}>Hello Alita</div>;
}
```

### displayName 和 packageId

* Type: string

配置打包时候的包名和 Bundle Identifier，指的注意的是，它们需要再执行 cordova 项目初始化之前配置。

如果旧的项目，没有编写过原生代码，请删掉脚本生成的原生代码，重新初始化。

如果久的项目，编写过原生代码，那可以通过在 IDE 中修改，这两个值，如果发现不好改。
可以在 VS Code 中全局搜索替换。

### mainPath

* Type: string

修改项目的路由主入口。

默认主入口是 `src/pages/index/index.tsx`

```tsx
export default {
  mainPath: '/home',
};
```
经过上面配置修改之后，主入口变成 `src/pages/home/index.tsx`

### native

声明项目中使用到的 cordova 能力，执行脚本检测安装需要的cordova 插件和native 桥接变量。

```ts
export default {
  appType: 'cordova',
  native: ['file', 'device', 'camera', 'qr-scanner'],   // add the plugin name you want to add to the array, you can find the plugin name above.
};
```

配置完需要手动执行命令

```bash
alita native
```

### proxy

* Type: `object`
* Default: `{}`

配置请求代理。遇到跨域问题可尝试配置

```
export default {
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}
```

然后访问 `/api/users` 就能访问到 [http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users) 的数据。

> 代理只是服务请求代理，这个地址是不会变的。原理可以简单的理解为，在本地启了一个服务，你先请求了本地的服务，本地的服务转发了你的请求到实际服务器。所以你在浏览器上看到的请求地址还是 `http://localhost:8000/xxx` 。以服务端是否收到请求为准。
