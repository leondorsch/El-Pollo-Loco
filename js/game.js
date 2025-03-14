let canvas;
let world;
let keyboard = new Keyboard();
let drawableObject = new DrawableObject();
let gameAudios = [];
let gameIntervals = [];
let intervalFunctions = [];
let intervalTimes = [];
let isMuted = false;
let isPaused = false;
let bgMusic = new Audio('audio/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

/**
 * This function initializes the game world and sets up necessary event listeners.
 */
function init() {
    gameAudios.push(bgMusic);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    bindBtsPressEvents();
}

/**
 * This function binds touch events to the in-game control buttons.
 */
function bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * This function listens for keydown events and updates the keyboard state accordingly.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * This function listens for keyup events and updates the keyboard state accordingly.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode === 38) {
        keyboard.UP = false;
    }
    if (e.keyCode === 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode === 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * This function shows the game instructions overlay.
 */
function showInstructions() {
    document.getElementById('overlay').innerHTML += instructions();
}

/**
 * This function shows the impressum overlay.
 */
function showImpressum() {
    document.getElementById('overlay').innerHTML += impressum();
}

/**
 * This function closes the instructions overlay.
 */
function closeInstructions() {
    document.getElementById('instructions-overlay').outerHTML = "";
}

/**
 * This function closes the impressum overlay.
 */
function closeImpressum() {
    document.getElementById('impressum-overlay').outerHTML = "";
}

/**
 * This function toggles fullscreen mode.
 * @param {HTMLImageElement} e - The image element that was clicked to trigger fullscreen.
 */
function toggleFullScreen(e) {
    if (e.src.includes("fullscreen")) {
        applyFullscreenStyle();
        let fullscreen = document.getElementById('fullscreen');
        e.src = './img/9_intro_outro_screens/start/minimize.png';
        openFullscreen(fullscreen);
    } else {
        removeFullscreenStyle();
        e.src = './img/9_intro_outro_screens/start/fullscreen.png';
        exitFullScreen();
    }
}

/**
 * This function applies styling to elements needed for the fullscreen view
 */
function applyFullscreenStyle() {
    document.getElementById('overlay').classList.add('overlay-fullscreen');
    document.getElementById('canvas').classList.add('canvas-fullscreen');
    document.getElementById('epl-h1').classList.add('d-none');
}

/**
 * This function removes styling to elements needed for the fullscreen view
 */
function removeFullscreenStyle() {
    document.getElementById('epl-h1').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('overlay-fullscreen');
    document.getElementById('canvas').classList.remove('canvas-fullscreen');
}

/**
 * This function enters fullscreen mode.
 * @param {HTMLImageElement} e - The image element that triggered fullscreen.
 */
function openFullscreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
}

/**
 * This function exits fullscreen mode.
 */
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * This event listener triggers when fullscreen state changes, to update UI elements.
 */
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.getElementById('epl-h1').classList.remove('d-none');
        document.getElementById('overlay').classList.remove('overlay-fullscreen');
        document.getElementById('canvas').classList.remove('canvas-fullscreen');
        document.getElementById('fullscreen-start').src = './img/9_intro_outro_screens/start/fullscreen.png';
        document.getElementById('fullscreen-ingame').src = './img/9_intro_outro_screens/start/fullscreen.png';
    }
});

/**
 * This function toggles the sound on the start screen between on and off.
 * @param {HTMLImageElement} e - The image element that was clicked to toggle sound.
 */
function toggleSoundStartScreen(e) {
    if (e.src.includes("sound.png")) {
        localStorage.setItem("sound", "on");
        bgMusic.play();
        e.src = 'img/9_intro_outro_screens/start/sound-off.png';
    } else {
        bgMusic.pause();
        localStorage.setItem("sound", "off");
        e.src = 'img/9_intro_outro_screens/start/sound.png';
    }
}

/**
 * This function toggles in-game sound between muted and unmuted.
 * @param {HTMLImageElement} e - The image element that was clicked to mute/unmute.
 */
function toggleGameSounds(e) {
    let isMuted = e.src.includes("sound.png");
    if (isMuted) {
        e.src = 'img/9_intro_outro_screens/start/sound-off.png';
        localStorage.setItem("gameSound", "off");
    } else {
        e.src = 'img/9_intro_outro_screens/start/sound.png';
        localStorage.setItem("gameSound", "on");
    }
    gameAudios.forEach(audio => {
        audio.muted = isMuted;
    });
}

/**
 * This function listens for the "Enter" key press and starts the game.
 */
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("start-game-btn").click();
    }
});

/**
 * This function starts the game, hides the overlay, and initializes the game level.
 */
function startGame() {
    let sound = localStorage.getItem("gameSound");
    if (sound !== "off") {
        localStorage.setItem("gameSound", "on");
    }
    removeOverlay();
    bgMusic.pause();
    initLevel();
    init();
    gameAudios.forEach(audio => {
        audio.muted = sound === "off";
    });
}

/**
 * This function removes the overlay if the game started.
 */
function removeOverlay() {
    let overlay = document.getElementById('overlay');
    let homeBtn = document.getElementById('go-home-btn');
    homeBtn.classList.remove('d-none');
    overlay.style.display = "none";
    overlay.classList.remove('overlay-finished');
}

/**
 * This function navigates the player to the home screen.
 */
function navigateHome() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('overlay-finished');
    document.getElementById('go-home-btn').classList.add('d-none');
    document.getElementById('sound-symbol').classList.remove('d-none');
    document.getElementById('impressum').classList.remove('d-none');
    document.getElementById('instructions').classList.remove('d-none');
    document.getElementById('fullscreen-start').classList.remove('d-none');
}

/**
 * This function pauses or resumes the game depending on its current state.
 */
function pauseAndResumeGame() {
    if (!isPaused) {
        gameIntervals.forEach(clearInterval);
        isPaused = true;
    } else {
        intervalFunctions.forEach((fn, i) => {
            let time = intervalTimes[i];
            let intervalId = setInterval(fn, time);
            gameIntervals.push(intervalId);
        });
        isPaused = false;
    }
}

/**
 * This function ends the game, stops all sounds, and shows the end game overlay.
 */
function endGame() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
    setTimeout(() => {
        stopAllSounds();
    }, 1800);
    showEndGameOverlay();
}

/**
 * This function stops all sounds
 */
function stopAllSounds() {
    gameAudios.forEach(audio => {
        audio.muted = true;
    });
    gameAudios = [];
}

/**
 * This function shows the end game overlay.
 */
function showEndGameOverlay() {
    setTimeout(() => {
        document.getElementById('overlay').style.display = "flex";
        document.getElementById('overlay').classList.add('overlay-finished');
        document.getElementById('go-home-btn').style.display = "flex";
        document.getElementById('sound-symbol').classList.add('d-none');
        document.getElementById('impressum').classList.add('d-none');
        document.getElementById('instructions').classList.add('d-none');
        document.getElementById('fullscreen-start').classList.add('d-none');
    }, 500);
}