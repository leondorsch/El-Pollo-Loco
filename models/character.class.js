/**
 * Represents the playable chracter object in the game that moves.
 * Extends the `MovableObject` class and provides properties and methods
 */
class Character extends MovableObject {
    footsteps_sound = new Audio('audio/footsteps.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    game_over_sound = new Audio('audio/game-over.mp3');
    height = 230;
    y = 60;
    speed = 10;
    otherDirection = false;
    isDying = false;
    offset = {
        top: 120,
        bottom: 0,
        left: 30,
        right: 30
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    /**
     * This function creates an instance of the character and loads necessary images.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        gameAudios.push(this.footsteps_sound, this.jump_sound, this.game_over_sound);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }
    /**
     * This function executes all animations for the character.
     */
    animate() {
        this.setStoppableInterval(() => this.characterIdle(), 200);
        this.setStoppableInterval(() => this.characterMovements(), 1000 / 60);
        this.setStoppableInterval(() => this.characterPlay(), 200);
    };

    /**
     * Handles the idle animation of the character.
     * If the character is standing and it's not the first load, plays a long idle animation.
    */
    characterIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        if (this.isStanding() && !this.firstCharacterLoad) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }

    /**
     * Handles character movements such as walking and jumping.
     * Adjusts the camera position accordingly.
     */
    characterMovements() {
        this.footsteps_sound.pause();
        if (this.characterCanMoveRight()) {
            this.moveRight();
        }
        if (this.characterCanMoveLeft()) {
            this.moveLeft();
        }
        if (this.characterCanJump()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} True if the right arrow key is pressed and within the movement boundary.
     */
    characterCanMoveRight() {
        return this.world.keyboard.RIGHT && this.x < 2200;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if the left arrow key is pressed and within the movement boundary.
     */
    characterCanMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the space key is pressed and the character is on the ground.
     */
    characterCanJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Moves the character to the right and plays the footsteps sound.
     */
    moveRight() {
        this.otherDirection = false;
        super.moveRight();
        this.footsteps_sound.play();
    }

    /**
     * Moves the character to the left and plays the footsteps sound at reduced volume.
     */
    moveLeft() {
        this.otherDirection = true;
        super.moveLeft();
        this.footsteps_sound.play();
        this.footsteps_sound.volume = 0.5;
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    jump() {
        this.footsteps_sound.pause();
        super.jump();
        console.log(this.y)
        console.log(this.speed)
        this.jump_sound.play();
        this.jump_sound.volume = 0.4;
        this.jump_sound.loop = false;
    }

    /**
     * Determines and plays the appropriate animation based on the character's state.
     * If the character is dead, it triggers the death animation and ends the game.
     */
    characterPlay() {
        if (this.characterIsDead()) {
            this.playGameOverAudio();
            this.characterAnimationDead();
            endGame();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    playGameOverAudio() {
        this.game_over_sound.play();
        this.game_over_sound.volume = 1.;
        this.game_over_sound.loop = false;
    }

    /**
     * Checks if the character is dead and not already in a dying state.
     * @returns {boolean} True if the character is dead and not already dying.
     */
    characterIsDead() {
        return this.isDead() && !this.isDying;
    }

    /**
     * Handles the death animation of the character.
     * Moves the character downwards continuously to simulate falling.
     */
    characterAnimationDead() {
        this.isDying = true;
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 5;
        }, 50);
    }
}