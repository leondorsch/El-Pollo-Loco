/**
 * Represents a level in the game.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    /**
     * Creates an instance of a Level.
     * @param {Array} clouds - The enemies present in the level.
     * @param {Array} enemies - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} bottles - The bottles available for collection.
     * @param {Array} coins - The coins available for collection.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}