class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.y = 20;
        this.width = 500;
    }
}