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

