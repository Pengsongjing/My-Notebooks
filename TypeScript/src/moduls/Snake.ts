class Snake{
    head: HTMLElement; // 蛇头
    bodies: HTMLCollection; // 蛇的身体，包括蛇头，实时更新
    element: HTMLElement;

    constructor() {
        this.element = document.querySelector('.snake')!;
        this.head = document.querySelector('.snake > div')!;
        this.bodies = document.getElementsByClassName('snake')[0]!.getElementsByTagName('div');
    }

    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    set X(value: number){
        if(this.X === value){
            return ;
        }

        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了！')
        }
        this.moveBody()
        this.head.style.left = value + 'px';
        this.checkHeadBody()
    }

    set Y(value: number){
        if(this.Y === value){
            return ;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了！')
        }
        this.moveBody()
        this.head.style.top = value + 'px';
        this.checkHeadBody()
    }

    addBody() {
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    moveBody() {

        for(let i = this.bodies.length -1 ; i>0 ; i--){
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    checkHeadBody() {
        // 获取所有身体是否与头坐标发生重叠
        for(let i = 1; i < this.bodies.length - 1; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error('撞到自己了！')
            }
        }
    }
}
export default Snake;