/**
 * Represents the endboss in the game.
 * Provides functionality for loading and displaying images, handling animations,
 * and managing intervals.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 2500;
    isAlert = true;
    isHit = false;
    isDying = false;
    offset = {
        top: 100,
        bottom: 40,
        left: 60,
        right: 80,
    }
    boss_footsteps = new Audio('audio/boss_footsteps.mp3');
    boss_start = new Audio('audio/endboss-start.mp3');
    boss_dead = new Audio('audio/endboss-dead.mp3');
    victory_sound = new Audio('audio/victory.mp3');

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
    /**
     * This function creates an instance of the endboss with a specific image and x-coordinate.
     * @param {Object} character - Character object to have access to the character characteristics.
     */
    constructor(character) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        gameAudios.push(this.boss_start, this.boss_footsteps, this.victory_sound);
        this.character = character;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 2.2;
    }
    /**
     * This function executes the intervals for the movement of the bottle.
     */
    animate() {
        this.setStoppableInterval(() => this.endbossAnimations(), 200);
    }

    /**
     * Handles the animations of the endboss based on its state.
     */
    endbossAnimations() {
        if (this.endbossIsDead()) {
            this.victory_sound.play();
            this.playAnimationsDead();
            endGame();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.endbossIsAlert()) {
            this.endbossActions();
        } else if (this.isAlert) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Checks if the endboss is dead and not in the dying animation.
     * @returns {boolean} True if the endboss is dead, otherwise false.
     */
    endbossIsDead() {
        return this.isDead() && !this.isDying;
    }

    /**
     * Checks if the endboss should be alerted based on the character's position.
     * @returns {boolean} True if the endboss should be alerted, otherwise false.
     */
    endbossIsAlert() {
        return this.character.x >= 2000 && this.isAlert;
    }

    /**
     * Plays the death animation of the endboss and stops its movement.
     */
    playAnimationsDead() {
        if (localStorage.getItem("gameSound") == "on") {
            this.boss_dead.play();
        }
        this.isDying = true;
        clearInterval(this.IntervalBossChickenMoveLeft);
        clearInterval(this.IntervalBossChickenWalk);
        clearInterval(this.IntervalBossChickenAttack);
        this.IntervalBossChickenDead = this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
        setTimeout(() => {
            this.loadImage(this.IMAGES_DEAD[2]);
        }, 200);
    }

    /**
     * Initiates the endboss actions when it becomes alert.
     */
    endbossActions() {
        this.isAlert = false;
        this.boss_start.play();
        this.boss_start.volume = 0.2;
        this.boss_start.loop = false;
        this.moveLeft();
        this.walk();
        this.attack();
    }

    /**
     * Moves the endboss to the left.
     */
    moveLeft() {
        this.IntervalBossChickenMoveLeft = this.setStoppableInterval(() => {
            super.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Plays the walking animation and sound effects.
     */
    walk() {
        this.IntervalBossChickenWalk = this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.boss_footsteps.play();
            this.boss_footsteps.loop = false;
            this.boss_footsteps.volume = 0.2;
        }, 250);
    }

    /**
     * Triggers the attack animation at intervals.
     */
    attack() {
        this.IntervalBossChickenAttack = this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 3000);
    }
}
