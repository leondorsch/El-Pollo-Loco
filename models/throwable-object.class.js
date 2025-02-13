class ThrowableObject extends MovableObject {
    hasHit = false;
    throw_bottle_sound = new Audio('audio/throw-bottle.mp3');
    bottle = new Bottle();
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.bottle.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
    }
    rotateBottleInterval;
    throwBottleInterval;
    splashBottleInterval;

    animate() {
        this.throw(100, 150);
        this.throw_bottle_sound.loop = false;
        this.throw_bottle_sound.play();
        this.rotateBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100);
    }

    throw(isLeft) {
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
                this.x += isLeft ? -10 : 10; // Move left if isLeft is true, otherwise move right
            }
        }, 25);
    }
    

    bottleSplash(bottle) {
        if (bottle.y = 360) {
            clearInterval(this.throwBottleInterval);
            clearInterval(this.rotateBottleInterval);
            this.splashBottleInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }, 200)
        };

    }
}