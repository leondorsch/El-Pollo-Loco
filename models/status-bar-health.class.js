/**
 * Represents the health status bar for the player in the game.
 * The bar visually updates based on the player's remaining health.
 */
class StatusBarHealth extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]


    percentage = 100;
    /**
    * Creates an instance of StatusBarHealth.
    * Initializes position, size, loads images, and sets the initial health percentage.
    */
    constructor() {
        super();
        this.x = 0;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.IMAGES)
        this.setPercentage(100);
    }

    /**
     * Updates the health percentage of the player and changes the displayed image accordingly.
     * 
     * @param {number} percentage - The new health percentage (between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the correct image index based on the current health percentage.
     * 
     * @returns {number} The index of the image in the `IMAGES` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
