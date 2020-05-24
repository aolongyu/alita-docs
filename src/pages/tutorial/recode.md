---
previousText: 'Mock数据'
previousUrl: '/tutorial/mock'
nextText: '学习从模仿开始(作业)'
nextUrl: '/tutorial/task'
disableHtmlPreviews: true
---

# 代码重构

让代码放在更适合它的位置，使得项目更容易实现代码复用，也更加容易维护。

我们现在的代码 `./src/models/hero.ts`

```javascript
*fetch({ type, payload }, { put, call, select }) {
  const data = yield request('/api/herodetails.json', {   ---step1
    method: 'POST',
    body: JSON.stringify({                                ---step2
      ename: 110,
    }),
  });
  const localData = [                                     ---step3
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
      heros: data || localData,
    },
  });
},
```

- step1 将接口地址散乱地写在models代码中，不便于维护，也不便于接口变动
- step2 所有的post请求的body，都要进行JSON.stringify
- step3 静态数据，已经放在mock中了，这里不再需要

## 接口相关的都放到./src/services/api.ts

```javascript
import { request } from 'alita';

export async function queryHeroList(): Promise<any> {
  return request('/api/herolist.json');
}

export async function getHeroDetails(params: any): Promise<any> {
  return request('/api/herodetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
```

## ./src/models/hero.ts

```javascript
- import { request } from 'alita';
+ import { queryHeroList, getHeroDetails } from '@/services/api';
...
*fetch({ type, payload }, { put, call, select }) {
  const herolist = yield call(queryHeroList);
  const herodetails = yield call(getHeroDetails, { ename: 110 });
  console.log(herodetails);
  yield put({
    type: 'save',
    payload: {
      heros: herolist,
    },
  });
},
```

这样 `models` 就变得很干净了，也很好理解，这里的 `yield call` 是指等待调用某个函数执行完毕。

到这里我们已经写了一些比较良好的代码，来实现了英雄页面的数据初始化。

## 接口统一管理

### ./mock/api.ts

```javascript
import herolist from './herolist.json';
import item from './item.json';
import summoner from './summoner.json';
import ming from './ming.json';
export default {
  '/api/herolist.json': herolist,
  'POST /api/herodetails.json': (req, res) => {
    const { ename } = req.body;
    const hero = herolist.filter(item => item.ename === parseInt(ename, 10))[0];
    res.send(hero);
  },
  '/api/item.json': item,
  '/api/summoner.json': summoner,
  '/api/ming.json': ming,
};
```

### ./services/api.ts

```javascript
import { request } from 'alita';

export async function queryHeroList(): Promise<any> {
  return request('/api/herolist.json');
}

export async function getHeroDetails(params: any): Promise<any> {
  return request('/api/herodetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function queryItem(): Promise<any> {
  return request('/api/item.json');
}
export async function querySummoner(): Promise<any> {
  return request('/api/summoner.json');
}
export async function queryMing(): Promise<any> {
  return request('/api/ming.json');
}
```

现在感觉是不是比较工整和规范啦，你可以在获得接口文档之后优先编写这两个文件，这样就实现了一个前端数据服务，后续你自己或者其他协作成员，可以直接发起http请求，而不再理会数据模拟。

## 本章节代码

[alita github: feat-recode分支](https://github.com/alitajs/alitaDemo/tree/feat-recode)