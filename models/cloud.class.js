class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 2400;
        this.speed = 0.15;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 20)
    }
}