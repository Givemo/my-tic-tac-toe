const winArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class TimeTravel {
  constructor() {
    this.levels = new Array();
  }
}

let timetravel = new TimeTravel();

let history = document.getElementById("history-list");
let winningMessage = document.getElementById("winning-message");
let winningText = document.getElementById("winning-text");
let startButton = document.getElementById("clear-all");
const restartButton = document.getElementById("restartButton");
const grid = () => Array.from(document.getElementsByClassName("grid"));
const changeIdToNumber = (element) =>
  Number.parseInt(element.id.replace("grid", ""));
const emptyCells = () => grid().filter((cell) => cell.innerText === "");
const allSame = (arr) =>
  arr.every(
    (_cell) => _cell.innerText === arr[0].innerText && _cell.innerText !== ""
  );

const takeTurn = (index, letter) => (grid()[index].innerText = letter);
const opponentChoice = () =>
  changeIdToNumber(
    emptyCells()[Math.floor(Math.random() * emptyCells().length)]
  );

const endGame = (winningArr) => {
  winningArr.forEach((cell) => cell.classList.add("win"));
  disableEventListener();
  setTimeout(() => {
    winningMessage.classList.add("show");
    winningText.innerHTML = `${winningArr[0].innerText} Won!`;
  }, 1000);
};

const opponentTurn = () => {
  disableEventListener();
  setTimeout(() => {
    takeTurn(opponentChoice(), "X");
    createHistory("X");

    if (!checkVictory()) enableEventListener();
  }, 1000);
};

const clickFcn = (el) => {
  if (el.target.innerText === "") {
    takeTurn(changeIdToNumber(el.target), "O");
    createHistory(el.target.innerText);
    if (!checkVictory()) {
      opponentTurn();
    }
  }
};

const checkVictory = () => {
  let victory = false;
  winArrays.forEach((cell) => {
    const _grid = grid();
    const sequence = [_grid[cell[0]], _grid[cell[1]], _grid[cell[2]]];

    if (allSame(sequence)) {
      victory = true;
      endGame(sequence);
    }
  });

  return victory;
};

const clearAll = () => {
  grid().forEach((cell) => {
    cell.innerText = "";
    enableEventListener();
    cell.classList.remove("win");
  });
};

const createHistory = (play) => {
  let li = document.createElement("li");
  li.innerText = timetravel.levels;
  timetravel.levels.push(play);
  history.appendChild(li);
};

const enableEventListener = () =>
  grid().forEach((cell) => cell.addEventListener("click", clickFcn));
const disableEventListener = () =>
  grid().forEach((cell) => cell.removeEventListener("click", clickFcn));

startButton.addEventListener("click", (e) => {
  if (e.target.innerText === "Start") {
    enableEventListener();
    e.target.innerText = "Clear All";
  } else {
    e.target.innerText = "Start";
    clearAll();
  }
});

restartButton.addEventListener("click", () => {
  winningMessage.classList.remove("show");
  clearAll();
});
