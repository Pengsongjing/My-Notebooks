import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 游戏控制器
class GameControl{
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 存储蛇的移动方向
    direction: string = '';
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    init() { // 游戏初始化
        document.addEventListener('keydown',this.keyDownHandler.bind(this))
        this.run()
    }

    keyDownHandler(event: KeyboardEvent){
        // 检查用户是否按了正确的按键
        if(this.snake.bodies.length > 1){
            if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                if(this.direction === 'ArrowLeft' || this.direction === 'ArrowRight'){   
                    this.direction = event.key;
                }
            }else{
                if(this.direction === 'ArrowUp' || this.direction === 'ArrowDown'){   
                    this.direction = event.key;
                }
            }
        }else{
            this.direction = event.key;
        }
    }

    run() {
        let x = this.snake.X;
        let y = this.snake.Y;

        switch(this.direction){
            case 'ArrowUp': y -= 10;break;
            case 'ArrowDown': y += 10;break;
            case 'ArrowLeft': x -= 10;break;
            case 'ArrowRight': x += 10;break;
        }

        this.checkEat(x,y);

        try {
            this.snake.X = x;
            this.snake.Y = y;   
        } catch (e: any) {
            alert(e.message + 'GAME OVER!');
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1) * 30)
    }

    // 检查蛇是否吃到了食物
    checkEat(X:number, Y:number){
        if(X === this.food.X && Y === this.food.Y){
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}
export default GameControl;