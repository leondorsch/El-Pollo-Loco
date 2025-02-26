class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 2500;
    health = 100;
    isAlert = true;
    isHit = false;
    offset = {
        top: 100,
        bottom: 40,
        left: 60,
        right: 80,
    }

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    world;

    IntervalBossChickenAlert;
    IntervalBossChickenWalk;
    IntervalBossChickenAttack;
    IntervalBossChickenHurt;
    IntervalBossChickenDead;

    constructor(character) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.character = character;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.4;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.IntervalBossChickenMoveLeft);
                clearInterval(this.IntervalBossChickenWalk);
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.img = this.IMAGES_DEAD[this.IMAGES_DEAD.length];
                }, this.IMAGES_DEAD.length * 100); 

                this.IntervalBossChickenDead = setTimeout(() => {
                    clearInterval(this.IntervalBossChickenDead);
                }, 200);
                endGame();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.character.x >= 2000 && this.isAlert) {
                this.isAlert = false;
                this.IntervalBossChickenMoveLeft = setInterval(() => {
                    this.moveLeft();
                }, 1000 / 60);
                this.IntervalBossChickenWalk = setInterval(() => {
                    this.playAnimation(this.IMAGES_WALKING);
                }, 250);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

    }
}
