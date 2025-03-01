/**
 * Represents a background object in the game that moves.
 * Extends the `MovableObject` class and provides properties and methods
 * for managing background objects with a specific image, position, and size.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    /**
     * Creates an instance of a BackgroundObject with a specific image and x-coordinate.
     * @param {string} imagePath - The file path to the image to be loaded as the background.
     * @param {number} x - The x-coordinate for positioning the background
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}