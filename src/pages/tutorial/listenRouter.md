---
previousText: '导航到页面'
previousUrl: '/tutorial/navigation'
nextText: 'http请求'
nextUrl: '/tutorial/httpRequest'
disableHtmlPreviews: true
---

# 监听路由事件

这里有一个很常见的需求，我们需要在进入页面的时候，发起请求页面初始化数据。

这里我们有两种方式来实现(建议使用第一种， demo 中以第一种方式实现)。

### 第一种：./src/page/hero/index.tsx useEffect

```diff
useEffect(() => {
  dispatch!({
-     type: 'hero/query',
+     type: 'hero/fetch',
  });
  return () => {
    // 这里写一些需要消除副作用的代码
    // 如: 声明周期中写在 componentWillUnmount
  };
}, []);
```

### 第二种 ./src/models/hero.ts subscriptions

```js
import { Effect, Subscription } from 'alita';

export interface HeroModelType {
  ...,
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  ...,
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
}
```

这里需要注意的是，subscriptions是一个全局的监听，就是说，当设定触发条件满足时，所有的subscriptions都会响应，所以我们在这里判断了路由为当前路由时，发起一个effects事件。

## ./src/models/hero.ts

然后在 `effects` 里面，响应这个事件。

```javascript
effects: {
  *fetch({ payload }, { put, call, select }) {
    const data = [
      {
        ename: 105,
        cname: '廉颇',
        title: '正义爆轰',
        new_type: 0,
        hero_type: 3,
        skin_name: '正义爆轰|地狱岩魂',
      },
      {
        ename: 106,
        cname: '小乔',
        title: '恋之微风',
        new_type: 0,
        hero_type: 2,
        skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
      },
    ];
    yield put({
      type: 'save',
      payload: {
        heros: data,
      },
    });
  },
},
```

这里的 `*fetch` 前面的 `*` 表示它是一个异步函数，你可以在里面使用 `yield` 进行等待操作。

这里的 `put` 方法和 `dispatch` 方法可以理解为同一个方法，只是在不同的地方，用不同的方法名表示而已。

这里我们写了一个静态数据，然后又发起了一个叫做 `save` 的事件。

## ./src/models/hero.js reducers

最终我们在 `reducers` 中响应了这个 `save` 事件，用于更新页面数据，触发页面更新。

```javascript
reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
```

这里我们定义了一个比较通用的方法，在 `effects` 发起需要更新数据时，全部发起 `save` 事件。然后在 `save` 中只是简单的把 `payload` 解构出来，部分覆盖了页面的 `state`。

当然我们这次的 `effects-fetch` 里发起了更新一个叫做 `heros` 的对象，但是我们的页面 `state` 中没有。

```javascript
state:'hero'
```

所以我们还要修改我们页面的state

```diff
export interface HeroModelState {
  name: string;
+ heros: [];
} // 非typescript项目，可以忽略类型文件相关操作
...
  state: {
    name: '',
+   heros: [],
  },
```

修改完，保存。

## 在页面中使用数据

因为我们的页面和 `model` 是绑定的，所以可以从页面的 `props` 里面，取出 `hero` 对象，在里面取出我们定义的数据。

```diff
const HeroPage: FC<PageProps> = ({ hero, dispatch }) => {
-  const { name } = hero;  
+  const { name, heros } = hero;  

return (
  <div className={styles.center}>
    Hello {name}
+   <h2>This is {JSON.stringify(heros)}</h2>
  </div>
);
}
```

页面和数据绑定的对象，可以查看页面类前面的 `connect`，以下表示这个页面和 `namespace` 为 `hero`的 `model` 绑定，注意这里可以绑定多个 `model`，只要你需要取值的对象，你都可以绑定在页面上。

```js
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(HeroPage);
```

![image.png](https://cdn.nlark.com/yuque/0/2019/png/123174/1559267896922-5e965681-6b69-4d78-942a-d5717d575439.png#align=left&display=inline&height=773&name=image.png&originHeight=1546&originWidth=2806&size=390601&status=done&width=1403)

这样我们就实现了，监听路由事件取得静态数据，修改页面 `state`，触发页面重绘。






