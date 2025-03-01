/**
 * Represents clouds in the game that move.
 * Extends the `MovableObject` class and provides properties and methods.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    /**
     * This function creates an instance of clouds with a specific image and x-coordinate.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.15;
        this.animate();
    }
    /**
     * This function executes the intervals for the movement of the clouds.
     */
    animate() {
        this.setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 20)
    }
}