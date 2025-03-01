/**
 * Represents the status bar for coins in the game.
 * Displays different images based on the current percentage of collected bottles.
 */
class StatusBarCoins extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]
    

    percentage = 100;

    /**
     * Creates an instance of StatusBarCoins.
     * Initializes position, size, loads images, and sets the initial percentage.
     */
    constructor() {
        super();
        this.x = 0;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.IMAGES)
        this.setPercentage(0);
    }

    /**
     * Updates the percentage of collected coins and changes the displayed image accordingly.
     * 
     * @param {number} percentage - The new percentage of coins collected (between 0 and 100).
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
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }

}
