---
previousText: '美化英雄列表'
previousUrl: '/tutorial/heroList'
nextText: '完成英雄页banner'
nextUrl: '/tutorial/banner'
disableHtmlPreviews: true
---

# 增加过滤条件

![](https://cdn.nlark.com/yuque/0/2018/gif/123174/1545138897422-11de4b8d-8c42-448f-a64d-568aaf5ffb5f.gif#align=center&display=inline&height=816&originHeight=816&originWidth=1958&status=done&width=747)

这小节，我们会简单的使用antd的Card和Radio，还是一样的，你可以自己先尝试着，实现，如果你可以独立完成，那你就不需要阅读本节了。

## 实现步骤

### step1 分析数据，获得过滤条件

通过分析herolist的数据，我们得出herotype的对应表

```javascript
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];
```

### step2 添加Card布局

```diff
- import { Row, Col } from 'antd';
+ import { Row, Col, Card } from 'antd';
...
<div className={styles.normal}>
+  <Card className={styles.radioPanel}>
+  </Card>
...
```

![](https://cdn.nlark.com/yuque/0/2018/png/123174/1545139238245-109d65e8-05d3-4191-9cf3-5016c07e01d4.png#align=center&display=inline&height=246&originHeight=246&originWidth=1732&status=done&width=747)

### step3 增加单选框分组

```diff
- import { Row, Col, Card } from 'antd';
+ import { Row, Col, Radio, Card } from 'antd';
+ const RadioGroup = Radio.Group;
+ const heroType = [
+  { key: 0, value: '全部' },
+  { key: 1, value: '战士' },
+  { key: 2, value: '法师' },
+  { key: 3, value: '坦克' },
+  { key: 4, value: '刺客' },
+  { key: 5, value: '射手' },
+  { key: 6, value: '辅助' },
+ ];
...
<Card className={styles.radioPanel}>
+  <RadioGroup>
+   {heroType.map(data => (
+     <Radio value={data.key} key={`hero-rodio-${data.key}`}>
+       {data.value}
+     </Radio>
+   ))}
+  </RadioGroup>
</Card>
```

### step4 为单选框分组增加事件和值

```diff
- const { heros = [] } = hero;
+ const { heros = [], filterKey = 0 } = hero;
+ const onChange = e => {
+    console.log(e.target.value);
+ };
...
- <RadioGroup>
+ <RadioGroup onChange={onChange} value={filterKey}>
```

`./src/models/hero.ts` model中要增加filterKey值

```diff
export interface HeroModelState {
  name: string;
  heros: [];
+ filterKey: number;
}

state: {
    heros: [],
+   filterKey:0
},
```

### step5 将事件同步到model中

从属性中取得dispatch方法

```diff
- const HeroPage: FC<PageProps> = ({ hero }) => {
+ const HeroPage: FC<PageProps> = ({ hero, dispatch }) => {
```

使用dispatch，将数据更新到页面上。

```diff
const onChange = e => {
-    console.log(e.target.value);
+    dispatch({
+     type:"hero/save",
+     payload:{
+       filterKey:e.target.value
+     }
+   })
};
```

`dispatch` 可以把事件发布到 `reducers` 和 `effects`，这里我们只需要更新 `filterKey` 就好，所以我们发起一个 `type` 为 `save` 的事件，这是我们之前的代码了，可以再看一下，它只是把参数同步到state中

```javascript
reducers: {
  save(state, action) {
    return { ...state, ...action.payload };
  },
},
```

### step6 使用filterKey过滤数组

```diff
<Row>
- {heros.reverse().map(item => (
+ {heros.filter((item: any)=>filterKey===0||item.hero_type === filterKey).reverse().map((item: any) => (
...
</Row>
```

第一个条件 `filterKey===0` 是因为我们把全部的key设置为0

第二个条件判断 `hero_type`,过滤数组。

### step7 保存，运行程序

![](https://cdn.nlark.com/yuque/0/2018/gif/123174/1545140337075-3ff02e9d-a35b-4801-9c98-981085a0ba76.gif#align=center&display=inline&height=816&originHeight=816&originWidth=1958&status=done&width=747)

## 作业

参考上述操作，为局内布局增加过滤条件。

提示

```javascript
const itemType = [
  { key: 0, value: '全部' },
  { key: 1, value: '攻击' },
  { key: 2, value: '法术' },
  { key: 3, value: '防御' },
  { key: 4, value: '移动' },
  { key: 5, value: '打野' },
  { key: 7, value: '辅助' },
];
```

![](https://cdn.nlark.com/yuque/0/2018/gif/123174/1545141114618-664e8b3a-e541-44f1-b805-4b45d2c9861a.gif#align=center&display=inline&height=802&originHeight=802&originWidth=1960&status=done&width=747)