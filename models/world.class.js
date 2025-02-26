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

    constructor(canvas, keyboard) {
        gameAudios.push(this.game_music, this.chicken_sound,this.coin_sound,this.bottle_sound, this.hurt_sound,this.chicken_dead)
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadLevel();
        this.setWorld();
        this.setGameSounds();
        this.run();
    }

    loadLevel() {
        if (this.level) {
            this.draw();
        } else {
            return;
        }
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    setGameSounds() {
        if (this.level) {
            this.game_music.loop = true;
            this.game_music.volume = 0.3;
            this.game_music.play();
            this.chicken_sound.loop = true;
            this.chicken_sound.volume = 0.8;
            this.chicken_sound.play();
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfNearEndboss();
        }, 50);
    }

    checkThrowObjects() {
        if (this.bottleIsFlying == false) {
            if (this.keyboard.D) {
                if (this.bottles.length > 0) {
                    this.bottleIsFlying = true;
                    let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
                    this.throwableObjects.push(bottle);
                    this.bottles.pop();
                    this.statusBarBottles.setPercentage(this.bottles.length);
                }
                setTimeout(() => {
                    this.bottleIsFlying = false;
                }, 500);
            }
        }

    }

    checkIfNearEndboss() {
        if (this.character.x > 2000 && !this.statusBarEndboss) {
            this.statusBarEndboss = new StatusBarEndboss(500, 40);
        }
    }

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
    collisionCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !enemy.isDead) {
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

    collisionCharacterEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hitCharacterEndboss();
            this.hurt_sound.play();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0)
        // space for fixed objects
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        if (this.statusBarEndboss) this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addToMap(this.endboss);

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        try {
            objects.forEach(o => {
                this.addToMap(o);
            })
        } catch (error) {

        }

    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}