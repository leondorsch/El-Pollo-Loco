/**
 * Represents an object in the game that is movable.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastMovement = 0;
    firstCharacterLoad = true;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    /**
     * This function applies gravity on moving objects.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }
    /**
     * This function checks if an object is above the ground.
     * @returns {boolean} `true` if the object is above the ground, otherwise `false`.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else if (this instanceof Character) {
            return this.y < 180;
        } else if (this instanceof SmallChicken) {
            return this.y < 360;
        }
    }
    /**
     * 
     * @param {Object} mo 
     * @returns {boolean} `true` if the object is above the ground, otherwise `false`.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // R -> L
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T -> B
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // B -> T
    }
    /**
     * This function reduces the energy if a collision has occured.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * This function reduces the energy of the endboss if he is hit by a bottle.
     */
    hitBottlesEndboss() {
        this.energy -= 40;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * This function reduces the energy of the character if he is colliding with the endboss.
     */
    hitCharacterEndboss() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * This function checks if the object is currently in a "hurt" state.
     * @returns {boolean} - `true` if the object is still hurt (within 1 second of the last hit), otherwise `false`.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
    /**
     * This function checks if the character is standing.
     * @returns {boolean} - `true` if the character is standing for more then 10 seconds, otherwise `false`.
     */
    isStanding() {
        let timepassed = new Date().getTime() - this.lastMovement;
        timepassed = timepassed / 1000;
        setTimeout(() => {
            this.firstCharacterLoad = false;
        }, 10000);
        return timepassed > 10;
    }
    /**
     * This function checks if character or endboss is dead.
     * @returns {boolean} - `true` if the energy equals 0, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }
    /**
    * Plays an animation by cycling through an array of images.
    * 
    * @param {Array} images - An array of image paths representing animation frames.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    /**
    * Moves the object to the right based on its speed.
    * Also updates the last movement timestamp.
    */
    moveRight() {
        this.x += this.speed;
        this.lastMovement = new Date().getTime();
    }
    /**
    * Moves the object to the left based on its speed.
    * Also updates the last movement timestamp.
    */
    moveLeft() {
        this.x -= this.speed;
        this.lastMovement = new Date().getTime();
    }
    /**
    * Makes the object jump by setting its vertical speed.
    * Also updates the last movement timestamp.
    */
    jump() {
        this.speedY = 30;
        this.lastMovement = new Date().getTime();
    }
    /**
    * Makes a small chicken jump by setting a lower vertical speed.
    */
    SmallChickenJump() {
        this.speedY = 10;
    }
}