/**
 * Represents a chicken in the game that moves.
 * Extends the `MovableObject` class and provides properties and methods
 */
class Chicken extends MovableObject {
    isDead = false;
    height = 60;
    y = 360;
    width = 60;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 20,
    }
    IntervalChickenMoveLeft;
    IntervalChickenWalk;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    /**
     * This function creates an instance of a chicken with a specific image and x-coordinate.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * This function executes the intervals for the movement of the bottle.
     */
    animate() {
        this.IntervalChickenMoveLeft = this.setStoppableInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.IntervalChickenWalk = this.setStoppableInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    /**
     * 
     * @param {Object} enemy - The enemy that is beeing jumped on.
     */
    chickenDead(enemy) {
        this.isDead = true;
        clearInterval(this.IntervalChickenMoveLeft);
        clearInterval(this.IntervalChickenWalk);
        enemy.loadImage(this.IMAGES_DEAD[0]);
    }
}