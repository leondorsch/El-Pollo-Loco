class Chicken extends MovableObject {
    isDead = false;
    height = 60;
    y = 360;
    width = 60;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 20,
    }
    IntervalChickenMoveLeft;
    IntervalChickenWalk;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
        this.IntervalChickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        this.IntervalChickenWalk = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    };

    chickenDead(enemy) {
        clearInterval(this.IntervalChickenMoveLeft);
        clearInterval(this.IntervalChickenWalk);
        enemy.loadImage(this.IMAGES_DEAD[0]);
    }
}