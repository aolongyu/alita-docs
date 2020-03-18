---
previousText: '编译错误'
previousUrl: '/faq/build'
nextText: '跨域错误'
nextUrl: '/faq/cors'
contributors:
  - brandyscarney
---

# 运行时错误

1、 alita -v 错误
大致报文如下：

```bash
Cannot find module 'umi-plugin-***' from 'xx'
```

重新执行一次 `yarn global add alita`，如果还不行。
打开报错的文件夹。查看里面时候有项目文件，如 config、src、package.json 等，如果有，全部删除。可能在alita@1的时候，全局执行了 `alita g app`。

> alita 2 不会出现这个误操作，因为创建 app 的时候必须指定 name，会新建一个文件夹。

2、alita cordova --android

```bash
$ alita cordova --android
cordova add android platforms ...
Using cordova-fetch for cordova-android@~7.1.1

Failed to fetch platform cordova-android@~7.1.1
Probably this is either a connection problem, or platform spec is incorrect.
Check your connection and platform name/version/URL.
Error: npm: Command failed with exit code 254 Error output:
✨  Done in 31.42s.
```

以下三种方式，任意一种方式都有可能处理这个问题。
1.更新全局的cordova版本
2.切换npm源到淘宝源
3.清空cordova缓存

你可以尝试任意一种方案，直到问题解决，如果都无法解决，或者您有其他解决方案，你修改本篇文章。
