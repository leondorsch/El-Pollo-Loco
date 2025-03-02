/**
 * This function returns the contents of the instructions.
 * @returns {HTML} - Contents of the instructions page
 */
function instructions() {
    return `
        <div id="instructions-overlay" class="instructions-overlay">
            <div class="close-instructions-overlay">
                <img onclick="closeInstructions()" src="./img/9_intro_outro_screens/start/cross.png" alt="">
            </div>
            <div class="instructions-container">
                <div class="instruction">
                    <span>THROW</span><img src="./img/9_intro_outro_screens/start/letter-d.png" alt="">
                </div>
                <div class="instruction">
                    <span>JUMP</span><img src="./img/9_intro_outro_screens/start/space.png" alt="">
                </div>
                <div class="instruction">
                    <span>LEFT</span><img src="./img/9_intro_outro_screens/start/left.png" alt="">
                </div>
                <div class="instruction">
                    <span>RIGHT</span><img src="./img/9_intro_outro_screens/start/right.png" alt="">
                </div>
            </div>
        </div>
    `
}