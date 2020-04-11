---
previousText: '本地部署调试'
previousUrl: '/tutorial/local'
disableHtmlPreviews: true
---

# 部署到GitHub

要部署到github也很简单。

安装umi-plugin-gh-pages

```bash
$ yarn add umi-plugin-gh-pages
or
$ npm i umi-plugin-gh-pages --save
```

config/config.ts

```javascript
plugins: [
    'umi-plugin-gh-pages',
],
base: '/alita-course/',
publicPath: '/alita-course/',
```

这里的base和publicPath配置的是你的github项目名字。

如这里我希望通过[http://alitajs.github.io/alita-course/](http://alitajs.github.io/alita-course/)访问（github page网络不是很好，最好由科学上网）

![](https://cdn.nlark.com/yuque/0/2019/png/123174/1546484270851-65322839-1815-4d06-b5b5-233faa9cf8c5.png#align=center&display=inline&height=1556&originHeight=1556&originWidth=2694&status=done&width=747)

因为本地部署调试，不需要修改任何的代码和配置，所以一般可以先保证使用serve或now部署可访问之后，再尝试其他部署方式。
