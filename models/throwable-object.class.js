/**
 * Represents a throwable object (e.g., a bottle) that the player can throw in the game.
 * The object rotates while being thrown and plays splash animations when it hits the ground.
 * 
 */
class ThrowableObject extends MovableObject {
    hasHit = false;
    throw_bottle_sound = new Audio('audio/throw-bottle.mp3');
    bottle_splash_sound = new Audio('audio/bottle-break.mp3')
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

    /**
    * Creates an instance of a throwable bottle object.
    * Initializes the object’s image, position, and animation.
    * 
    * @param {number} x - The x-coordinate where the bottle is thrown from.
    * @param {number} y - The y-coordinate where the bottle is thrown from.
    * @param {boolean} otherDirection - Determines the direction in which the bottle is thrown.
    */
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

    /**
     * Animates the throwing and rotation of the bottle.
     * The bottle rotates while being thrown and then triggers a splash animation upon impact.
     */
    animate() {
        this.throw(this.otherDirection);
        this.rotateBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100);
    }

    /**
     * Throws the bottle in the specified direction.
     * Plays a sound when the bottle is thrown and applies gravity to simulate the bottle’s fall.
     * 
     * @param {boolean} otherDirection - Determines the direction of the throw. 
     * If `true`, the bottle is thrown to the left; otherwise, to the right.
     */
    throw(otherDirection) {
        if (localStorage.getItem("gameSound") == "on") {
            this.throw_bottle_sound.play();
            this.throw_bottle_sound.volume = 0.3;
        }
        this.speedY = 20;
        this.applyGravity();
        this.playBottleInterval(otherDirection);
    }

    /**
     * This function excecutes the Interval for the animations of the bottle.
     * @param {boolean} otherDirection - Is true if the character is turned left, wrong if in normal direction.
     */
    playBottleInterval(otherDirection) {
        this.throwBottleInterval = setInterval(() => this.bottleAnimations(otherDirection), 25);
    }

    /**
     * This function plays the animations of the bottle.
     * @param {boolean} otherDirection - Is true if the character is turned left, wrong if in normal direction.
     */
    bottleAnimations(otherDirection) {
        if (this.y > 360) {
            clearInterval(this.throwBottleInterval);
            clearInterval(this.rotateBottleInterval);
            this.hasHit = true;
            this.setStoppableInterval(() => {
                this.playAnimation(this.bottle.IMAGES_BOTTLES);
            }, 1000);
        } else {
            if (otherDirection === true) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }
    }

    /**
     * Triggers the splash animation when the bottle hits the ground.
     * Plays a splash sound and animates the bottle breaking into pieces.
     */
    bottleSplash() {
        clearInterval(this.throwBottleInterval);
        clearInterval(this.rotateBottleInterval);
        if (localStorage.getItem("gameSound") == "on") {
            this.bottle_splash_sound.play();
            this.bottle_splash_sound.volume = 0.5;
        }
        this.splashBottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 200)
    }
}