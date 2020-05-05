# cover-shell-question命令答询

> 在node中经常会遇到命令答询，找遍网上没有即轻量又满足需要的，所以决定自己维护一个

## 使用

```typescript
// npm i cover-shell-question --save

const {ShellQuestion} = require('cover-shell-question');

const quesList = [
  {
    handle: (value) => {console.log(value)},
    type: 'input',
    question: '您的名字是？'
  }，
  {
    handle: (value) => {console.log(value)},
    type: 'select',
    question: '您的性别是？',
    options: ['m', 'w']
  }，
]

const shellQ = new ShellQuestion(arr);

shellQ.start();
```

## quesList说明

```typescript
interface IList {
	/** 输入正确以后要执行的方法 */
	handle: (value: string, context?: string[]) => void;
	/** 问答类型 */
	type: 'input' | 'select';
	/** 问题 */
	question: string;
	/** 选项，type = select时必填 */
	options?: string[];
}
```

## ShellQuestion 对象说明

### 方法

#### start  开始执行轮训问答

```typescript
shellQ.start();
```

#### addListener   监听执行成功事件

```typescript
shellQ.addListener('success', (context) => {
  // 所有问题的答案
  console.log(context);
})
```

## 效果图如下

![alt](https://xiooshow.com:8888/public/image/07ab6900-8eaa-11ea-8c1a-a7a76dddb23e.png)



