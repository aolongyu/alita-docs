---
previousText: '词汇表'
previousUrl: '/faq/glossary'
nextText: '运行时错误'
nextUrl: '/faq/runtime'
disableHtmlPreviews: true
contributors:
  - brandyscarney
---

# 编译错误

## 常见错误

待补充

## 常见异常

### The dependency was not found
![app with a different mode](/assets/img/faq/tips/change-device-platform.png)

一般是网络不好装包错误导致的，可以删除 `*.lock` 和 `node_modules` 重新执行 `yarn`，如果多次尝试都无法解决。可以在项目目录下执行 `git clean -dfx`，再重装，一般可以解决。

### ***/polyfill.tx

![babelcache](/assets/img/faq/error/babelcache.png)

删除 `src/.umi/cache` 重启即可。

> 例如，同一个项目你同事可以运行，你运行出错。一般都是缓存或者安装包过程出错问题。可以尝试删除几个缓存目录，重试。
