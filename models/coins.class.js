class Coin extends MovableObject {
    height = 120;
    width = 120;
    
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = this.x = 200 + Math.random() * (2200 - 200);
        this.y = 140 + Math.random() * 100;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 800);
    };

    
}