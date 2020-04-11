---
previousText: '项目结构'
previousUrl: '/tutorial/structure'
nextText: '添加页面'
nextUrl: '/tutorial/addPage'
disableHtmlPreviews: true
---

# 全局布局

## 第一步 打开./src/layouts/index.tsx

```javascript
import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

export default BasicLayout;
```

layout 文件如上。可以看到，其实 `layout` 也是一个组件。框架会自动使用它包裹页面，并传入 `props`。

```js
//props
{
history: {length: 1, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/", search: "", hash: "", query: {…}, state: undefined}
match: {path: "/", url: "/", isExact: true, params: {…}}
route: {path: "/", component: ƒ, routes: Array(2), _title: "hero", _title_default: "hero"}
staticContext: undefined
}
```

你可以随意的修改这个文件，但是一定要记得包裹 `{ props.children }`。

## 第二步 使用antd的layout

在文件头部引入 `antd` 的 Layout 组件,并从 `Layout` 中取出 `Header`, `Content`, `Footer`。

```javascript
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
```

使用Header, Content, Footer，包裹children。

```javascript
import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

const BasicLayout: React.FC = ({ children }) => (
  <Layout>
    <Header>
      <div style={{ color: 'white' }}>王者荣耀资料库</div>
    </Header>
    <Content style={{ padding: '0 50px' }}>{children}</Content>
    <Footer style={{ textAlign: 'center' }}>Alita 入门教程 Created by xiaohuoni</Footer>
  </Layout>
);

export default BasicLayout;

```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/123174/1559265326381-38863928-56dd-4f77-91f5-97ac0b0ca9e4.png#align=left&display=inline&height=118&name=image.png&originHeight=452&originWidth=2866&size=90683&status=done&width=746)

更改完后的效果，看起来不错吧，你可以随意的改改，看看效果。

## 第三步 增加页面导航

在 `Header` 中增加导航

```diff
<Header>
- <div style={{ color: 'white' }}>王者荣耀资料库</div>
+ <div className={styles.logo}>王者荣耀资料库 </div>
+    <Menu
+      theme="dark"
+      mode="horizontal"
+      defaultSelectedKeys={['1']}
+      style={{ lineHeight: '64px' }}
+    >
+      <Menu.Item key="1">英雄</Menu.Item>
+      <Menu.Item key="2">局内道具</Menu.Item>
+      <Menu.Item key="3">召唤师技能</Menu.Item>
+    </Menu>
</Header>
```

在 `./src/layouts/index.less` 中增加 `logo` 样式

```css
.logo {
  width: 148px;
  color: white;
  margin: 16px 24px 16px 0;
  float: left;
  font-size: 18px;
  line-height: 30px;
}
```

为了使得页面更美观，修改Content

```jsx
<Content style={{ padding: '0 50px' }}>
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      {props.children}
    </div>
</Content>
```

## 最终效果

<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/123174/1559265720348-bdcb3b00-b123-4b85-8f36-9ee19540f7e7.png#align=left&display=inline&height=409&name=image.png&originHeight=818&originWidth=2864&size=91249&status=done&width=1432)

