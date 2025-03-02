/**
 * Represents the game world that manages all the objects, interactions, and game logic.
 * It handles the drawing, collisions, throwing of objects, and the status of the game.
 */
class World {
    character = new Character();
    chicken = new Chicken();
    bottle = new Bottle();
    camera_x = 0;
    endboss = new Endboss(this.character);
    movableObject = new MovableObject();
    level = level1;
    ctx;
    canvas;
    keyboard;
    bottleIsFlying = false;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = null;
    throwableObjects = [];
    coins = [];
    bottles = [];
    game_music = new Audio('audio/game-music.mp3');
    chicken_sound = new Audio('audio/chicken-bg-sounds.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    chicken_dead = new Audio('audio/chicken-dead.mp3');

    /**
     * Creates an instance of the game world.
     * Initializes the character, enemies, objects, and game sounds, and starts the game loop.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element on which the game will be rendered.
     * @param {Object} keyboard - The keyboard object used to track user input.
     */
    constructor(canvas, keyboard) {
        gameAudios.push(this.game_music, this.chicken_sound, this.coin_sound, this.bottle_sound, this.hurt_sound, this.chicken_dead)
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadLevel();
        this.setWorld();
        this.setGameSounds();
        this.run();
    }

    /**
     * Loads the level data and draws the game world if the level is set.
     */
    loadLevel() {
        if (this.level) {
            this.draw();
        } else {
            return;
        }
    }

    /**
     * Sets the world for the character and endboss, linking them to the current world.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Sets the game sounds, including background music and sound effects.
     * Loops the game music and chicken sound.
     */
    setGameSounds() {
        let gameSound = localStorage.getItem("gameSound");
        if (this.level && gameSound == "on") {
            this.game_music.loop = true;
            this.game_music.volume = 0.3;
            this.game_music.play();
            this.chicken_sound.loop = true;
            this.chicken_sound.volume = 0.8;
            this.chicken_sound.play();
        }
    }

    /**
     * Starts the game loop, checking for collisions and throwable objects.
     * Runs every 50 milliseconds.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfNearEndboss();
        }, 50);
    }

    /**
     * Checks if any throwable objects (e.g., bottles) are thrown by the character.
     * If the character presses the throw button and has bottles available, a new throwable object is created.
     */
    checkThrowObjects() {
        if (this.bottleIsFlying == false) {
            if (this.keyboard.D) {
                if (this.bottles.length > 0) {
                    this.bottleIsFlying = true;
                    let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
                    this.throwableObjects.push(bottle);
                    this.bottles.pop();
                    this.statusBarBottles.setPercentage(this.bottles.length);
                } setTimeout(() => {
                    this.bottleIsFlying = false;
                }, 500);
            }
        }
    }

    /**
     * Checks if the character is near the endboss and creates a status bar for the endboss if not already created.
     */
    checkIfNearEndboss() {
        if (this.character.x > 2000 && !this.statusBarEndboss) {
            this.statusBarEndboss = new StatusBarEndboss(500, 40);
        }
    }

    /**
     * Checks for collisions between various game entities (e.g., character, enemies, bottles, etc.).
     */
    checkCollisions() {
        if (this.level) {
            this.collisionCharacterEnemies();
            this.collisionCharacterCoins();
            this.collisionCharacterBottles();
            this.collisionEnemyBottles();
            this.collisionCharacterEndboss();
            this.collisionEndbossBottles()
        }
    }

    /**
     * Handles collisions between the character and enemies.
     * The character will take damage if not above ground, or the enemy will be killed if hit from above.
     */
    collisionCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 10 && !enemy.isDead) {
                    enemy.chickenDead(enemy);
                    enemy.isDead = true;
                    this.chicken_dead.play();
                } else if (!enemy.isDead) {
                    this.character.hit();
                    this.hurt_sound.play();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * Handles collisions between throwable objects (e.g., bottles) and enemies.
     * The enemy is killed and the bottle is destroyed if they collide.
     */
    collisionEnemyBottles() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasHit) {
                    enemy.chickenDead(enemy);
                    bottle.bottleSplash(bottle);
                    enemy.isDead = true;
                    bottle.hasHit = true;
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 800);
                }
            });
        });
    }

    /**
     * Handles collisions between the character and coins.
     * The character collects coins when they collide with them.
     */
    collisionCharacterCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.coin_sound.volume = 0.4;
                this.coins.push(coin);
                this.statusBarCoins.setPercentage(this.coins.length);
                return false;
            }
            return true;
        });
    }

    /**
     * Handles collisions between the character and bottles.
     * The character collects bottles when they collide with them.
     */
    collisionCharacterBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottle_sound.play();
                this.bottles.push(bottle);
                this.statusBarBottles.setPercentage(this.bottles.length);
                return false;
            }
            return true;
        });
    }

    /**
     * Handles collisions between the character and the endboss.
     * The character takes damage when colliding with the endboss.
     */
    collisionCharacterEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hitCharacterEndboss();
            this.hurt_sound.play();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Handles collisions between throwable objects (e.g., bottles) and the endboss.
     * The endboss takes damage when hit by a bottle.
     */
    collisionEndbossBottles() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (bottle.isColliding(this.endboss) && !bottle.hasHit) {

                bottle.hasHit = true;
                this.endboss.hitBottlesEndboss();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                bottle.bottleSplash(bottle);
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1);
                }, 800);
            }
        });
    }

    /**
     * Draws the game world on the canvas.
     * Updates the positions of all objects and renders the game entities.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addBackgroundObjects();
        this.ctx.translate(-this.camera_x, 0)
        // space for fixed objects
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0)
        this.addMovableObjects();
        this.ctx.translate(-this.camera_x, 0)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds the background objects to the draw function
     */
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Adds the statusbars to the draw function
     */
    addStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        if (this.statusBarEndboss) this.addToMap(this.statusBarEndboss);
    }

    /**
     * Adds the movable objects to the draw function
     */
    addMovableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);
        this.addToMap(this.character);
    }

    /**
    * Adds multiple objects to the map.
    * 
    * @param {Array} objects - The objects to be added to the map.
    */
    addObjectsToMap(objects) {
        try {
            objects.forEach(o => {
                this.addToMap(o);
            })
        } catch (error) {

        }

    }

    /**
     * Adds a single object to the map, flipping it if necessary (for mirrored characters).
     * 
     * @param {MovableObject} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for mirrored characters.
     * 
     * @param {MovableObject} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original position and scale of an object after flipping its image.
     * 
     * @param {MovableObject} mo - The object whose image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}