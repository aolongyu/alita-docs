---
previousText: '增加过滤条件'
previousUrl: '/tutorial/filter'
nextText: '动态路由'
nextUrl: '/tutorial/dynamicRouter'
disableHtmlPreviews: true
---

# 完成英雄页banner

![](../../assets/img/tutorial/banner1.gif)

这是一篇纯写样式的代码，旨在让你再次熟悉数据流，和页面渲染。如果你能够独立完成上面的效果，那你就不用继续阅读这篇文章了。

### 1.添加mock数据

`./mock/api.ts`

```javascript
import { Request, Response } from 'express';
import herolist from './heros';

export default {
  'POST /api/freeheros.json': (req: Request, res: Response) => {
    const { number } = req.body;
    function getRandomArrayElements(arr, count) {
      const shuffled = arr.slice(0);
      let i = arr.length;
      const min = i - count;
      let temp;
      let index;
      // eslint-disable-next-line no-plusplus
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
```

这里我们增加了周免英雄的接口，从英雄池里面随机取出了几个对象，这个方法是我找来的，旨在做一个简单的演示，不要太在意，如果你有更好的方法，完全可以用你自己的。

### 2.增加请求服务

`./src/services/api.js`

```javascript
export async function queryFreeHeros(params: any): Promise<any> {
  return request('/api/freeheros.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
```

### 3.在model中请求数据

`./src/models/hero.ts`

```diff
- import { queryHeroList, getHeroDetails } from '@/services/api';
+ import { queryHeroList, getHeroDetails, queryFreeHeros } from '@/services/api';

export interface HeroModelState {
   heros: any;
   filterKey: number;
+  freeheros: any;
+  itemHover: number;
}

export default {
  state: {
    heros: [],
+   freeheros: [],
    filterKey: 0,
+   itemHover:0  //因为周免英雄列表里面有一个一直是详情图，所以这里给一个标记
  },
  subscriptions: {
    ...
  },
  reducers: {
    ...
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const herolist = yield call(queryHeroList);
      const herodetails = yield call(getHeroDetails, { ename: 110 });
+     const freeheros = yield call(queryFreeHeros,{number:13});
      yield put({
        type: 'save',
        payload: {
          heros: herolist,
+         freeheros: freeheros
        },
      });
    },
  },
};
```

### 4.编写FreeHeroItem组件

`./src/components/FreeHeroItem.tsx`

```jsx
import React from 'react';
interface FreeHeroItemProps {
  data: any;
  thisIndex: number;
  onItemHover: Function;
  itemHover: number;
}
const FreeHeroItem: React.FC<FreeHeroItemProps> = ({ data, thisIndex, onItemHover, itemHover }) => {
  if (!data || !data.ename) return null;
  return (
    <img
      onMouseEnter={() => {
        itemHover !== thisIndex && onItemHover(thisIndex);
      }}
      style={{
        borderRadius: '5px',
        height: '69px',
        margin: '5px',
        width: itemHover === thisIndex ? '224px' : '69px',
      }}
      src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${data.ename}/${data.ename}${
        itemHover === thisIndex ? '-freehover.png' : '.jpg'
      }`}
    />
  );
};
export default FreeHeroItem;
```

因为这个组件的样式很少，所以我们把样式写在style中，这样可以减少一个less文件。

### 5.在页面中渲染数据

`./src/pages/hero/index.tsx`

```js
import FreeHeroItem from '@/components/FreeHeroItem';
... ...
const { heros = [], filterKey = 0, freeheros = [] ,itemHover=0} = hero;
... ...
return (
  <div className={styles.normal}>
    <div className={styles.info}>
      <Row className={styles.freehero}>
        <Col span={24}>
          <p>周免英雄</p>
          <div>
            {freeheros.map((data,index) => {
              return <FreeHeroItem data={data} itemHover={itemHover} onItemHover={onItemHover} thisIndex={index} key={index}/>
            })}
          </div>
        </Col>
      </Row>
    </div>
    ... ...
  </div>
)
```

### 6.为页面添加样式

`./src/pages/hero/index.less`

```less
.normal {
  background: url(//game.gtimg.cn/images/yxzj/web201605/top_banner/bg_wrapper2.jpg) no-repeat center
    top;
  padding-top: 500px;
}
.info {
  padding: 8px 20px 0;
  margin-bottom: 20px;
  .freehero {
    overflow: hidden;
    width: 100%;
    border-radius: 5px;
    height: 115px;
    padding: 0 15px;
    background-color: #123564;
    p {
      color: #a6afbc;
      margin: 5px;
    }
  }
}
```

### 7.为页面增加响应事件

`./src/components/FreeHeroItem.tsx`

```diff
// 详细代码见步骤4
+ onMouseEnter={() => {
+    itemHover !== thisIndex && onItemHover(thisIndex);
+ }}
```

`./src/pages/hero/index.tsx`

```diff
const onChange = e => {
    ...
  };
+ const onItemHover=e=>{
+    dispatch({
+      type: 'hero/save',
+      payload: {
+        itemHover: e
+      },
+    });
+  }
return (
//这里面的详细代码见步骤5
)
```

## 本章节代码

[alita github: feat-banner分支](https://github.com/alitajs/alitaDemo/tree/feat-banner)