/**
 * Represents a bottle in the game that moves.
 * Extends the `MovableObject` class and provides properties and methods.
 */
class Bottle extends MovableObject {
    height = 60;
    y = 360;
    width = 60;
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 30,
    }
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * This function creates an instance of a bottle with a specific image and x-coordinate.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = this.x = 200 + Math.random() * (2200 - 200);
        this.animate();
    }
    /**
     * This function executes the intervals for the movement of the bottle.
     */
    animate() {
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 1000);
    };
}