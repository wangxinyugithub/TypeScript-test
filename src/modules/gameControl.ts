import Food from "./food";
import Snake from "./snake";
import ScorePanel from "./scorePanel";

export default class GameControl {
    // 定义类型
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;

    // 移动方向
    direction: string = '';

    // 是否进行
    isLive: boolean = true;

    constructor() {
        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    // 游戏初始化
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    // ArrowUp ArrowDown ArrowLeft ArrowRight
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    // 控制蛇移动
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }

        // 检测蛇是否吃到食物
        this.checkEat(X, Y);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert(e.message);
            this.isLive = false;
        }

        this.isLive && setTimeout(() => this.run(), 300 - (this.scorePanel.level) * 30);
    }

    // 检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}
