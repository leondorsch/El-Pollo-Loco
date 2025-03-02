/**
 * Represents a small chicken enemy in the game.
 * The small chicken moves left, animates its walking cycle, and can jump occasionally.
 * It stops moving when defeated.
 */
class SmallChicken extends MovableObject {
    isDead = false;
    height = 60;
    y = 360;
    width = 60;
    offset = {
        top: 0,
        bottom: 10,
        left: 10,
        right: 10,
    }
    IntervalChickenMoveLeft;
    IntervalChickenWalk;
    IntervalChickenJump;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]
    /**
     * Creates an instance of SmallChicken.
     * Initializes movement, loads images, sets a random starting position, and starts the animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.2;
        this.applyGravity();
        this.animate();
    }
    /**
     * Starts the movement and animation of the small chicken.
     * The chicken moves left, plays a walking animation, and jumps occasionally.
     */
    animate() {
        this.IntervalChickenMoveLeft = this.setStoppableInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60)
        this.IntervalChickenWalk = this.setStoppableInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
        this.IntervalChickenJump = this.setStoppableInterval(() => {
            if (!this.isAboveGround(true) && !this.isDead) {
                this.SmallChickenJump();
            }
        }, 2000);
    };
    /**
     * Handles the small chicken's death.
     * Stops all movement and animation intervals and updates the enemy's image to the dead sprite.
     * 
     * @param {MovableObject} enemy - The enemy object representing the small chicken.
     */
    chickenDead(enemy) {
        this.isDead = true;
        clearInterval(this.IntervalChickenMoveLeft);
        clearInterval(this.IntervalChickenWalk);
        clearInterval(this.IntervalChickenJump);
        enemy.loadImage(this.IMAGES_DEAD[0]);
    }
}