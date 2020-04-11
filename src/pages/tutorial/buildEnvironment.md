---
nextText: '快速上手'
nextUrl: '/tutorial/quickStart'
disableHtmlPreviews: true
---

# 开发环境搭建

Alita 在 Windows, Mac 和 Linux 的表现都是一致的。你只需要在电脑上安装 Node.js 环境。

为了便于开发，你需要使用 VisualStudio Code。因为后续我们会使用配套的 VisualStudio Code 插件来提升开发效率，并且它还自带了一个命令行执行脚本。

## 第一步 安装Node.js

安装 [Node](https://nodejs.org/en/download/) 还是挺简单的，只需要到官网下载使用与自己系统的版本就可以了。

所有的安装都是“下一步”，就可以了。

如果你已经安装过 Node，那么你可以跳过前一步。

接下来在终端/控制台窗口中运行命令 `node -v`，来验证一下你正在运行 `node 8.1x` 以上的版本。

```bash
>node -v
v8.10.1
```

如果终端成功打印出 `node` 的版本号，就可以进入下一步了。

## 第二步 安装VisualStudio Code

还是[官网](https://code.visualstudio.com/)下载,全部下一步。

## 第三步 安装VisualStudio Code插件

安装完 VS Code 之后，打开 VS Code，在最左侧功能按钮中选中，扩展。

![](https://cdn.nlark.com/yuque/0/2018/png/123174/1543918091234-c32dd883-994d-4894-8604-a4ab7a62d6d1.png#align=center&display=inline&height=575&originHeight=575&originWidth=675&status=done&width=675)

在搜索中，查找 “Oni”，选择Oni JavaScript Snippet，安装

![](https://cdn.nlark.com/yuque/0/2018/png/123174/1543921718726-c6558944-2d57-403d-81b5-f68e1955b2d4.png#align=center&display=inline&height=401&originHeight=687&originWidth=1279&status=done&width=747)

使用方法：

![](https://cdn.nlark.com/yuque/0/2018/gif/123174/1543921749122-c38c5030-9dab-4701-b27e-379165ef581a.gif#align=center&display=inline&height=203&originHeight=203&originWidth=502&status=done&width=502)

这个插件集成了很多umi的代码段，如果你发现有任何遗漏的，可以在[ISSUES](https://github.com/xiaohuoni/snippet/issues)中讨论。

## 第四步 在VS Code中使用命令行

打开VS Code，使用快捷键 `Ctrl + ·`，(键盘 `Esc` 下面，`数字1` 左边的键)，如果你的电脑上存在热键冲突，无法正确打开。那你可以在你的项目目录区域，点击右键，在命令提示符中打开。

打开VS Code，使用快捷键 `Ctrl + ·`，(键盘Esc下面，数字1左边的键)，如果你的电脑上存在热键冲突，无法正确打开。那你可以在你的项目目录区域，点击右键，在命令提示符中打开。

![](https://cdn.nlark.com/yuque/0/2018/png/123174/1543921766562-0695e941-9791-41ef-9d3b-c89cfe29b84c.png#align=center&display=inline&height=181&originHeight=231&originWidth=951&status=done&width=747)

具体的使用我们会在后面的章节中提到。

## 附录：VSCode 推荐安装插件

```text
Debugger for Chrome
Git History
MDTools
npm
React Native Tools
vscode-icons
vscode-styled-jsx
Settings Sync
Babel JavaScript
ESLint
GitLens — Git supercharged
LintLens — ESLint rules made easier
DotENV
Guides
Bracket Pair Colorizer
ES7 React/Redux/GraphQL/React-Native snippets
Color Highlight
gitignore
TODO Highlight
Sort JSON objects
EditorConfig for VS Code
Image preview
Markdown All in One
Markdown Preview Github Styling
HTML CSS Support
Sort lines
Version Lens
Visual Studio IntelliCode - Preview
```



