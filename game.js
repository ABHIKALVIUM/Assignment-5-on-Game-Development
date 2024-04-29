const gameBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var seconds = document.getElementById("timer").textContent;
var zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];

const expAudio = new Audio(
  "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
);
expAudio.volume = 0.2;
gameBody.onclick = () => {
  expAudio.pause();
  expAudio.currentTime = 0;
  expAudio.play();
};

const backgroundSound = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);
backgroundSound.play();
backgroundSound.loop = true;

var lives = 4;


function makeZombie() {
  randomImage = img[getRandomInt(0, img.length)];
  gameBody.innerHTML += `<img src="https://cdn.jsdelivr.net/gh/Kalvium-Program/zombie-shoot-game-final@main/assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestruct(zombie);
  };
}


function checkCollision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}


function zombieDestruct(zombie) {
  zombie.style.display = "none";
  zombieId++;
  makeZombie();
}


var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombieId);
  if (checkCollision(zombie) == true) {
    zombieDestruct(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

makeZombie();


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; 
}
