import {EventEmitter} from 'events';

interface IList {
  /** 输入正确以后要执行的方法 */
  handle: (value: string, context?: string[]) => void;
  /** 问答类型 */
  type: 'input' | 'select';
  /** 问题 */
  question: string;
  /** 选项，type = select时必填 */
  options?: string[];
  oriQuestion?: string;
  again?: boolean;
}

export = class ShellQuestion extends EventEmitter {
  /** 轮训队列 */
  quesList: IList[] = [];

  /** 答案的上下文 */
  context:string[] = [];

  constructor(quesList: IList[]) {
    super();
    this.quesList = quesList;
  }
  /** 开始轮训 */
  start() {
    if (!Array.isArray(this.quesList)) {
      process.stdout.write('必须传入一个数组');
      return
    }

    if (this.quesList.length === 0) {
      process.stdout.write('数组不能为空哦！');
      return
    }

    let item: any = this.getItemQues();
    process.stdout.write(item.question);

    process.stdin.on('data', (value) => {
      let data = value.length !== 0 ? value.slice(0, value.length - 1).toString() : ''
      if (item.options && item.options.indexOf(data) < 0) {
        this.quesList.unshift({
          handle: item.handle,
          type: 'select',
          question: item.oriQuestion,
          options: item.options,
          again: true
        })
      } else {
        this.context.push(data);
        item.handle(data, this.context);
      }
      if (this.quesList.length === 0) {
        this.emit('success', this.context);
        process.exit()
      }
      item = this.getItemQues();
      process.stdout.write(item.question);
    })
  }

  /** 获取单项的 */
  private getItemQues(): IList {
    let item = this.quesList.shift();
    if (item.type === 'input') {
      return this.input(item)
    }
    return this.select(item)
  }

  /** 输入型控制 */
  private input(item: IList): IList {
    return {
      question: item.question,
      handle: item.handle,
      type: 'input'
    }
  }

  /** 选择型控制 */
  private select(item: IList): IList {
    let str = ''
    item.options.forEach((item, index) => {
      if (index !== 0) {
        str += '|'
      }
      str += item
    })
    return {
      question: `${item.question}(${str})`,
      handle: item.handle,
      options: item.options,
      oriQuestion: item.question,
      type: 'select'
    }
  }
}
