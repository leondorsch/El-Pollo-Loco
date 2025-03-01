/**
 * Represents coins in the game that move.
 * Extends the `MovableObject` class and provides properties and methods.
 */
class Coin extends MovableObject {
    height = 120;
    width = 120;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
    }
    /**
   * This function creates an instance of coins with a specific image and x-coordinate.
   */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = this.x = 200 + Math.random() * (2200 - 200);
        this.y = 140 + Math.random() * 100;
        this.animate();
    }
    /**
     * This function executes the intervals for the movement of the clouds.
     */
    animate() {
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 800);
    };


}