---
previousText: '完成英雄页banner'
previousUrl: '/tutorial/banner'
nextText: '部署现有容器'
nextUrl: '/tutorial/container'
disableHtmlPreviews: true
---

# 动态路由

## 新建道具详情页面

### 1、使用g pages新建页面

```bash
$ alita g pages itemdetail

Write: src/pages/itemdetail/index.tsx
Write: src/pages/itemdetail/index.less
Write: src/models/itemdetail.ts
```

### 2、重命名herodetail/index.tsx

`./src/pages/itemdetail/index.tsx` => `./src/pages/itemdetail/[index].tsx`。

框架中约定，带 `[]` 的目录或文件为动态路由。

## 在页面中取得动态路由传参

```diff
- const ItemdetailPage: FC<PageProps> = ({ itemdetail, dispatch }) => {
+ const ItemdetailPage: FC<PageProps> = ({ itemdetail, dispatch, match }) => {
+   console.log(match);
    ...
  }
```

动态路由的参数通过 `match`，这里打印的值，如上述标注。相当于this.props.match。
访问http://localhost:8000/#/itemdetail/1726

![](../../assets/img/tutorial/dyrouter1.png)

## 路由修改

当我们在动态路由 `http://localhost:8000/#/itemdetail/1726` 去点击 `tab` 上的英雄、局内道具、召唤师技能按钮会发现路由出现了问题。在以下页面进行路由配置修改。

`src/layouts/index.tsx`

```diff
- const menuData = [
-   { route: 'hero', name: '英雄' },
-   { route: 'item', name: '局内道具' },
-   { route: 'summoner', name: '召唤师技能' },
- ];

+ const menuData = [
+   { route: '/hero', name: '英雄' },
+   { route: '/item', name: '局内道具' },
+   { route: '/summoner', name: '召唤师技能' },
+ ];
```

## 在动态路由中监听初始化

如果你使用 dva `subscriptions` 进行页面路由监听的话，可以按下面修改： 

```diff
subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
-       if (pathname === '/itemdetail')) {
+       if (pathname.indexOf('itemdetail')) {
          dispatch({
            type: 'query'
          })
        }
      });
    }
  },
```

最简单的做法就是做字符串判断。

## 从道具列表跳转到详情页

`src/pages/item/index.tsx`

```diff
+ import { router } from 'alita';
...
+ const gotoDetail = val => {
+   router.push(`/itemdetail/${item.item_id}`);
+ };
...
-  <Col key={val.item_id} span={3} className={styles.heroitem} >
+ <Col key={val.item_id} span={3} className={styles.heroitem} onClick={() => gotoDetail(val)}>
```

## 在详情页查询详细信息

`src/pages/itemdetail.tsx`

```diff
// 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
-      type: 'itemdetail/query',
+      type: 'itemdetail/fetch',
+      payload: {
+        itemId: match.params.index,
+      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
```

`src/models/itemdetail.ts`

这里我们可以通过 `yield select(_ => _.~)`，获取其他 `models` 的 `state` 值。

```js
export interface ItemdetailModelState {
-    name: string;
+   itemDetail: {};
}

const ItemdetailModel: ItemdetailModelType = {
  namespace: 'itemdetail',

  effects: {
-      query: Effect;
+     fetch: Effect;
  };

  state: {
      name: '',
+     itemDetail: {},
  },

  effects: {
    *fetch({ payload }, { put, select }) {
      const { itemId = '' } = payload;
      const { itemList = [] } = yield select((_: { item: any }) => _.item);
      const itemDetail = itemList.filter((it: any) => it.item_id === JSON.parse(itemId));
      yield put({
        type: 'save',
        payload: {
          itemDetail,
        },
      });
    },
  }
}
```

`src/pages/itemdetail.tsx`

```diff
-  const { name } = itemdetail;
+  const { itemDetail = {} } = itemdetail;

-  return <div className={styles.center}>Hello {name}</div>;
+  return <div className={styles.center}>Hello {JSON.stringify(itemDetail)}</div>;
```

## 增加一个返回按钮

```js
import { Button } from 'antd';
import { router } from 'alita';
...
<Button onClick={() => router.goBack()}>返回英雄列表页</Button>
```

## 本章节代码

[alita github: feat-dyRouter分支](https://github.com/alitajs/alitaDemo/tree/feat-dyRouter)



