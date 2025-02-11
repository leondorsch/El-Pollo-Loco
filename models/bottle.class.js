class Bottle extends MovableObject {
    height = 60;
    y = 360;
    width = 60;
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = this.x = 200 + Math.random() * (2200 - 200);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 1000);
    };
}