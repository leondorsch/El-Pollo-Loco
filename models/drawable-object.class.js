/**
 * Represents a drawable object in the game.
 * Provides functionality for loading and displaying images, handling animations,
 * and managing intervals.
 */
class DrawableObject {
    intervalIds = [];
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    /**
     * Loads an image from the given path and sets it as the object's image.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    /**
     * Draws the objects image onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    /**
     * Draws a bounding box/frame around certain game objects.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(
                this.x + this.offset.right,
                this.y + this.offset.top,
                this.width - (this.offset.right + this.offset.left),
                this.height - (this.offset.top + this.offset.bottom)
            );
            ctx.stroke();
        }
    }
    /**
     * Loads multiple images and stores them in the image cache.
     * @param {Array} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    /**
     * Sets a stoppable interval for an animation or game logic function.
     * Stores the interval function and time in global arrays.
     * 
     * @param {function} fn - The function to execute at each interval.
     * @param {number} time - The interval duration in milliseconds.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        intervalFunctions.push(fn);
        intervalTimes.push(time);
        gameIntervals.push(id);
    }
}