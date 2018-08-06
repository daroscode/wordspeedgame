//Starting
window.addEventListener("load", init);

//Game levels
const levels = {
    easy: 7,
    medium: 5,
    hard: 3
}

//Level changer
let currentLevel = levels.easy;

//Globals
let time = currentLevel;
let score = 0;
let isPlaying;

//Variáveis DOM
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const levelDisplay = document.querySelector("#level");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const words = [
    "Alegria",
    "amOr",
    "c@rinho",
    "Paz",
    "gratidão",
    "HonestidAde",
    "Medo",
    "TerRor",
    "PavoR",
    "Solidao",
    "EmanciPar",
    "quadrado",
    "r3dondo",
    "Círculo",
    "Contador",
    "administrativo",
    "Domínio",
    "Sessão",
    "maravilha",
    "Const@nte",
    "AprendEr",
    "aprendizado",
    "Razão",
    "Pr4zer",
    "Noj0",
    "concordar",
    "Praticar",
    "amizade"
];

//Initialize game
function init() {

    //Show level seconds
    seconds.innerHTML = currentLevel;

    //Load word
    showWord(words);

    //Input match
    wordInput.addEventListener("input", startMatch);

    //Call countdown every second
    setInterval(countDown, 1000);

    //Status check
    setInterval(checkStatus, 50);
}

// Match function
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = "";
        score++;
    }
    switch (score) {
        case 10:
            currentLevel = levels.medium;
            seconds.innerHTML = currentLevel;
            levelDisplay.classList.remove("text-success");
            levelDisplay.classList.add("text-warning");
            levelDisplay.innerHTML = "MÉDIO";
            break;
        case 20:
            currentLevel = levels.hard;
            seconds.innerHTML = currentLevel;
            levelDisplay.classList.remove("text-warning");
            levelDisplay.classList.add("text-danger");
            levelDisplay.innerHTML = "DIFÍCIL";
            break;
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "Certo!!!";
        return true;
    } else {
        message.innerHTML = "";
        return false;
    }
}

//Pick and show word
function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

//Game timer
function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }

    timeDisplay.innerHTML = time;
}

//Game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = "Game over!";
        score = -1;
    }
}