class SmallChicken extends MovableObject {
    isDead = false;
    height = 60;
    y = 360;
    width = 60;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 20,
    }
    IntervalChickenMoveLeft;
    IntervalChickenWalk;
    IntervalChickenJump;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.2;
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.IntervalChickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        this.IntervalChickenWalk = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        this.IntervalChickenJump = setInterval(() => {
            if (!this.isAboveGround(true)) {
                this.SmallChickenJump();
            }
        }, 2000);

    };

    chickenDead(enemy) {
        clearInterval(this.IntervalChickenMoveLeft);
        clearInterval(this.IntervalChickenWalk);
        clearInterval(this.IntervalChickenJump);
        enemy.loadImage(this.IMAGES_DEAD[0]);
    }


}