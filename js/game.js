let canvas;
let world;
let keyboard = new Keyboard();
let bgMusic = new Audio('audio/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

function init() {
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

function showImpressum(){
    document.getElementById('overlay').innerHTML += impressum();
}

function closeInstructions(){
    document.getElementById('instructions').outerHTML = "";
}

function closeImpressum(){
    document.getElementById('impressum').outerHTML = "";
}

function fullScreen() {
    let fullscreen = document.getElementById('fullscreen');
    let fullscreenCanvas = document.getElementById('canvas');
    enterFullScreen(fullscreenCanvas);
    enterFullScreen(fullscreen);
}

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleSound() {
    let img = document.getElementById('sound-symbol');

    if (img.src.includes("sound.png")) {
        bgMusic.play();
        img.src = 'img/9_intro_outro_screens/start/sound-off.png';
    } else {
        bgMusic.pause();
        img.src = 'img/9_intro_outro_screens/start/sound.png';
    }
}


function startGame() {
    document.getElementById('overlay').classList.add('d-none');
    bgMusic.pause();
    initLevel();
}
