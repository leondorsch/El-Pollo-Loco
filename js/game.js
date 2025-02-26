let canvas;
let world;
let keyboard = new Keyboard();
let gameAudios = [];
let gameIntervals = [];
let isMuted = false;
let bgMusic = new Audio('audio/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

function init() {
    gameAudios.push(bgMusic)
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Characte is', world.character);
}


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
})

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
})

function showInstructions() {
    document.getElementById('overlay').innerHTML += instructions();
}

function showImpressum() {
    document.getElementById('overlay').innerHTML += impressum();
}

function closeInstructions() {
    document.getElementById('instructions').outerHTML = "";
}

function closeImpressum() {
    document.getElementById('impressum').outerHTML = "";
}

function toggleFullScreen(e) {
    if (e.src.includes("fullscreen")) {
        let fullscreen = document.getElementById('fullscreen');
        e.src = './img/9_intro_outro_screens/start/minimize.png';
        openFullscreen(fullscreen);
    } else {
        e.src = './img/9_intro_outro_screens/start/fullscreen.png';
        exitFullScreen();
    }

}

function openFullscreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleSoundStartScreen(e) {
    if (e.src.includes("sound.png")) {
        bgMusic.play();
        e.src = 'img/9_intro_outro_screens/start/sound-off.png';
    } else {
        bgMusic.pause();
        e.src = 'img/9_intro_outro_screens/start/sound.png';
    }
}

function toggleGameSounds(e) {
    let isMuted = e.src.includes("sound.png");
    e.src = isMuted ? 'img/9_intro_outro_screens/start/sound-off.png' : 'img/9_intro_outro_screens/start/sound.png';
    gameAudios.forEach(audio => {
        audio.muted = isMuted;
    });
}


document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("start-game-btn").click();
    }
});

function startGame() {
    document.getElementById('overlay').classList.add('d-none');
    bgMusic.pause();
    initLevel();
    init();
}

function pauseGame() {
    
}

function endGame() {
    setTimeout(() => {
        document.getElementById('overlay').classList.remove('d-none');
        document.getElementById('overlay').style.backgroundImage = "url('img/9_intro_outro_screens/game_over/game over.png')";
    }, 1000);
}

