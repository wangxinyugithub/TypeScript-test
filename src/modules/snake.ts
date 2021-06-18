export default class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇身(包括蛇头) html元素集合
    bodies: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇头的坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头坐标
    set X(value) {
        if (this.X === value) return;
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了!!!');
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    set Y(value) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了!!!');
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    // 蛇添加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    // 蛇移动
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 头和身体相撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            const bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('蛇撞到自己了!!!');
            }
        }
    }
}
