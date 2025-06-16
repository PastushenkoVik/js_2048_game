'use strict';

const Game = require('../modules/Game.class');

const game = new Game();
const startButton = document.querySelector('.button.start');
const gameField = [...document.getElementsByClassName('field-row')].map(
  (row) => [...row.cells],
);

const setGameField = () => {
  game.getState().forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      gameField[rowIndex][colIndex].classList = 'field-cell';

      if (col) {
        gameField[rowIndex][colIndex].innerText = col;
        gameField[rowIndex][colIndex].classList.add(`field-cell--${col}`);
        if (col === 2048) {
          document.querySelector('.message-win').classList.remove('hidden');
        }
      } else {
        gameField[rowIndex][colIndex].innerText = '';
      }
    });
  });
  document.querySelector('.game-score').innerText = game.getScore();
};

document.addEventListener('keydown', (ev) => {
  let isNewTurn = false;

  switch (ev.key) {
    case 'ArrowUp':
      isNewTurn = game.moveUp();
      break;

    case 'ArrowDown':
      isNewTurn = game.moveDown();
      break;

    case 'ArrowLeft':
      isNewTurn = game.moveLeft();
      break;

    case 'ArrowRight':
      isNewTurn = game.moveRight();
      break;

    default:
      return 0;
  }

  if (isNewTurn) {
    setGameField();
  } else {
    document.querySelector('.message-lose').classList.remove('hidden');
  }
});

startButton.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('start')) {
    ev.target.classList.remove('start');
    ev.target.classList.add('restart');
    ev.target.innerText = 'Restart';
    document.querySelector('.message-start').classList.add('hidden');
    game.start();
  } else {
    document.querySelector('.message-lose').classList.add('hidden');
    document.querySelector('.message-win').classList.add('hidden');
    game.restart();
  }

  setGameField();
});

// eslint-disable-next-line no-console
console.log(game.getState());
