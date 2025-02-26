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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else if (this instanceof Character) {
            return this.y < 180;
        } else if (this instanceof SmallChicken) {
            return this.y < 360;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // R -> L
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T -> B
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // B -> T
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitBottlesEndboss() {
        this.energy -= 40;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitCharacterEndboss() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isStanding() {
        let timepassed = new Date().getTime() - this.lastMovement;
        timepassed = timepassed / 1000;
        setTimeout(() => {
            this.firstCharacterLoad = false;
        }, 10000);
        return timepassed > 10;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.lastMovement = new Date().getTime();
    }

    moveLeft() {
        this.x -= this.speed;
        this.lastMovement = new Date().getTime();
    }

    jump() {
        this.speedY = 30;
        this.lastMovement = new Date().getTime();
    }

    SmallChickenJump() {
        this.speedY = 10;
    }
}