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
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        gameAudios.push(this.throw_bottle_sound);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.bottle.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.animate();
    }
    rotateBottleInterval;
    throwBottleInterval;
    splashBottleInterval;

    animate() {
        this.throw(this.otherDirection);
        this.rotateBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100);
    }

    throw(otherDirection) {
        this.throw_bottle_sound.play();
        this.throw_bottle_sound.volume = 0.3;
        this.speedY = 20;
        this.applyGravity();
        this.throwBottleInterval = setInterval(() => {
            if (this.y > 360) {
                clearInterval(this.throwBottleInterval);
                clearInterval(this.rotateBottleInterval);
                this.hasHit = true;
                setInterval(() => {
                    this.playAnimation(this.bottle.IMAGES_BOTTLES);
                }, 1000);
            } else {
                if (otherDirection === true) {
                    this.x -= 10;
                } else {
                    this.x += 10;
                }
            }
        }, 25);
    }

    bottleSplash() {
        clearInterval(this.throwBottleInterval);
        clearInterval(this.rotateBottleInterval);
        this.splashBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 200)
    }
}