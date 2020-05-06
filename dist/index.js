"use strict";
const events_1 = require("events");
const color_1 = require("./color");
module.exports = class ShellQuestion extends events_1.EventEmitter {
    constructor(quesList) {
        super();
        this.quesList = [];
        this.context = [];
        this.quesList = quesList;
    }
    start() {
        if (!Array.isArray(this.quesList)) {
            process.stdout.write('必须传入一个数组');
            return;
        }
        if (this.quesList.length === 0) {
            process.stdout.write('数组不能为空哦！');
            return;
        }
        let item = this.getItemQues();
        process.stdout.write(item.question);
        process.stdin.on('data', (value) => {
            let data = value.length !== 0 ? value.slice(0, value.length - 1).toString() : '';
            if (item.options && item.options.indexOf(data) < 0) {
                this.quesList.unshift({
                    handle: item.handle,
                    type: 'select',
                    question: item.oriQuestion,
                    options: item.options,
                    again: true
                });
            }
            else {
                this.context.push(data);
                item.handle(data, this.context);
            }
            if (this.quesList.length === 0) {
                this.emit('success', this.context);
                process.exit();
            }
            item = this.getItemQues();
            process.stdout.write(item.question);
        });
    }
    getItemQues() {
        let item = this.quesList.shift();
        if (item.type === 'input') {
            return this.input(item);
        }
        return this.select(item);
    }
    input(item) {
        return {
            question: item.color ? color_1.colorAll[item.color](item.question) : item.question,
            handle: item.handle,
            type: 'input'
        };
    }
    select(item) {
        let str = '';
        item.options.forEach((item, index) => {
            if (index !== 0) {
                str += '|';
            }
            str += item;
        });
        return {
            question: item.color ? color_1.colorAll[item.color](`${item.question}(${str})`) : `${item.question}(${str})`,
            handle: item.handle,
            options: item.options,
            oriQuestion: item.question,
            type: 'select'
        };
    }
};
