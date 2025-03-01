/**
 * Represents the health status bar for the Endboss in the game.
 * The bar visually updates based on the Endboss's remaining health.
 */
class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange100.png',
    ]

    percentage = 100;
    /**
     * Creates an instance of StatusBarEndboss.
     * Initializes position, size, loads images, and sets the initial percentage.
     * @param {Number} x - x coordinate of the statusbar
     * @param {Number} y - y coordinate of the statusbar 
     */
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.IMAGES)
        this.setPercentage(100);
    }
    /**
     * Updates the percentage of the endboss energy and changes the displayed image accordingly.
     * 
     * @param {number} percentage - The new percentage of energy (between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    /**
     * Determines the correct image index based on the current percentage.
     * 
     * @returns {number} The index of the image in the `IMAGES` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}