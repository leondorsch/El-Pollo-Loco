class ThrowableObject extends MovableObject {
    bottle = new Bottle();
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.bottle.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
    }
    rotateBottleInterval;
    throwBottleInterval;

    animate() {
        this.throw(100, 150);
        this.rotateBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100);
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwBottleInterval = setInterval(() => {
            if (this.y >= 360) {
                clearInterval(this.throwBottleInterval);
                clearInterval(this.rotateBottleInterval);
                setInterval(() => {
                    this.y = 360;
                    this.playAnimation(this.bottle.IMAGES_BOTTLES);
                }, 1000);
            } else {
                this.x += 10;
            }
        }, 25);
    }
}