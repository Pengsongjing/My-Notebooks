
// 记分牌
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number; // 最大等级
    upScore: number; // 升级的分数


    constructor(maxLevel: number = 10,upScore: number = 3) {
        this.scoreEle = document.querySelector('.score')!;
        this.levelEle = document.querySelector('.level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if(this.score % this.upScore === 0){
            this.levelUp()
        }
    }

    levelUp() {
        if(this.level < this.maxLevel){      
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel;