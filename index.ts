import ShellQuestion from './src/index';
import colors from 'colors';
import colorAll from './src/color';

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
  color?: keyof typeof colorAll
}

const arr:IList[] = [
  {
    handle: (value) => {console.log(value)},
    type: 'input',
    question: '你好吗',
    color: 'gray'
  }
]

const shell = new ShellQuestion(arr);

shell.start();