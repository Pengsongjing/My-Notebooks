// 定义食物类
class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.querySelector('.food')!;
    }

    get X(){
        return this.element.offsetLeft;
    }

    get Y(){
        return this.element.offsetTop;
    }

    // 生成随机的位置 最小0 最大290 坐标必须是整十
    change() {

        let left = Math.round(Math.random() * 29 ) * 10;
        let top = Math.round(Math.random() * 29 ) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;