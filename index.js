const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', e => {
  e.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    startGame();
  }
});

board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add('up');
  createRandomCircle();
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;

    setTime(current);
  }
}

function setTime(value) {
  if (value < 10) {
    timeEl.innerHTML = `00:0${value}`;
  } else {
    timeEl.innerHTML = `00:${value}`;
  }
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = generateColor();

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счет: <span class ="primary">${score}</span></h1>`;
}
