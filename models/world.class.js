class World {
    character = new Character();
    chicken = new Chicken();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    coins = [];
    bottles = [];
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.bottles.length > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.bottles.pop(this.bottles);
                this.statusBarBottles.setPercentage(this.bottles.length);
            }

        }
    }

    checkCollisions() {
        this.collisionCharacterEnemies();
        this.collisionCharacterEnemiesFromTop();
        this.collisionCharacterCoins();
        this.collisionCharacterBottles();

    }

    collisionCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBarHealth.setPercentage(this.character.energy);
                console.log(this.character.energy)
            }
        })
    }

    collisionCharacterEnemiesFromTop() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromTop(enemy)) {
                enemy.chickenDead(enemy);
            }
        })
    }

    collisionCharacterCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.coins.push(coin);
                this.statusBarCoins.setPercentage(this.coins.length);
                console.log(this.coins.length)
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
        this.ctx.translate(this.camera_x, 0)


        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
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