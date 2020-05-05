import {EventEmitter} from 'events'

interface IList {
	/** 输入正确以后要执行的方法 */
	handle: (value: string, context: string[]) => void;
	/** 问答类型 */
	type: 'input' | 'select';
	/** 问题 */
	question: string;
	/** 选项，type = select时必填 */
	options?: string[];
  oriQuestion?: string;
  again?: boolean;
}

declare class ShellQuestion extends EventEmitter {
	constructor(quesList:IList[]);
	/** 开始执行轮训 */
  start(): void;
}

export as namespace ShellQuestion;
export = ShellQuestion;