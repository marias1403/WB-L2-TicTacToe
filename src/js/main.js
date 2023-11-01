import '../assets/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const grid = Array.from(document.querySelectorAll("[data-cell]"));
  const message = document.getElementById("message");
  const startButton = document.getElementById("start");
  const modeRadioButtons = document.getElementsByName("mode");
  const difficultyRadioButtons = document.getElementsByName("difficulty");
  let currentPlayer = "X";
  let isGameActive = true;
  let computerDifficulty = "random";

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function markCell(cell, value) {
    if (value === 'X') {
      cell.classList.add('game-board__cell_type_x')
    } else if (value === 'O') {
      cell.classList.add('game-board__cell_type_o')
    }
  }

  function checkWinner() {
    const cells = gridToCells(grid);
    const winningCombination = checkWin(cells);
    if (winningCombination) {
      isGameActive = false;
      message.textContent = `${currentPlayer} победил!`;
      if (currentPlayer === 'X') {
        grid[winningCombination[0]].style.backgroundColor = "#DEFFF0";
        grid[winningCombination[0]].style.border = "none";
        grid[winningCombination[1]].style.backgroundColor = "#DEFFF0";
        grid[winningCombination[1]].style.border = "none";
        grid[winningCombination[2]].style.backgroundColor = "#DEFFF0";
        grid[winningCombination[2]].style.border = "none";
      } else {
        message.style.color = '#E85AAD';
        grid[winningCombination[0]].style.backgroundColor = "#FFEFF7";
        grid[winningCombination[0]].style.border = "none";
        grid[winningCombination[1]].style.backgroundColor = "#FFEFF7";
        grid[winningCombination[1]].style.border = "none";
        grid[winningCombination[2]].style.backgroundColor = "#FFEFF7";
        grid[winningCombination[2]].style.border = "none";
      }
    }

    if (![...cells].some((cell) => !cell)) {
      isGameActive = false;
      message.textContent = "Ничья!";
    }
  }

  function checkWin(cells) {
    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return combination;
      }
    }

    return null;
  }

  function gridToCells() {
    let cells = [];

    grid.forEach((c) => {
      if (c.classList.contains('game-board__cell_type_x')) {
        cells.push('O');
      } else if(c.classList.contains('game-board__cell_type_o')) {
        cells.push('X');
      } else {
        cells.push('');
      }
    })

    return cells;
  }

  function handleCellClick(e) {
    const cell = e.target;

    if (cell.classList.contains('game-board__cell_type_x') || cell.classList.contains('game-board__cell_type_o') || !isGameActive) return;

    markCell(cell, currentPlayer);
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (isGameActive && (currentPlayer === "O" && getSelectedMode() === "computer")) {
      makeComputerMove();
    }

    saveGame()
  }

  function handleRestartClick() {
    grid.forEach((cell) => {
      console.log(cell);
      cell.classList.remove('game-board__cell_type_x');
      cell.classList.remove('game-board__cell_type_o');
      cell.style.backgroundColor = "";
      cell.style.border = '1px solid #D8DEE4';
    });
    message.textContent = "";
    currentPlayer = "X";
    isGameActive = true;
  }

  function handleModeChange() {
    if (getSelectedMode() === "computer" && currentPlayer === "O") {
      makeComputerMove();
    }
  }

  function handleDifficultyChange(e) {
    computerDifficulty = e.target.value;
  }

  function getSelectedMode() {
    for (const radio of modeRadioButtons) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return "human";
  }

  function makeComputerMove() {
    if (computerDifficulty === "random") {
      makeRandomMove();
    } else if (computerDifficulty === "smart") {
      makeSmartMove();
    }
  }

  function makeRandomMove() {
    const availableCells = [...grid].filter((cell) => !cell.classList.contains('game-board__cell_type_x') && !cell.classList.contains('game-board__cell_type_o'));
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      markCell(availableCells[randomIndex], currentPlayer);
      checkWinner();
      currentPlayer = "X";
    }
  }

  function makeSmartMove() {
    const cells = gridToCells(grid);

    // выиграть самому
    for (let i = 0; i < cells.length; i++) {
      if (cells[i]) {
        continue;
      }

      cells[i] = "O";
      if (checkWin(cells)) {
        markCell(grid[i], currentPlayer)
        checkWinner();
        currentPlayer = "X";
        return;
      }
      cells[i] = "";
    }

    // предотвратить победу противника
    for (let i = 0; i < cells.length; i++) {
      if (cells[i]) {
        continue;
      }

      cells[i] = "X";
      if (checkWin(cells)) {
        markCell(grid[i], currentPlayer);
        checkWinner();
        currentPlayer = "X";
        return;
      }
      cells[i] = "";
    }

    // Занять центр, если свободен
    if (!cells[4]) {
      markCell(grid[4], currentPlayer);
      checkWinner();
      currentPlayer = "X";
      return;
    }

    // Занять угол, если свободен
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(
      (index) => !cells[index]
    );
    if (availableCorners.length > 0) {
      const randomCorner =
        availableCorners[Math.floor(Math.random() * availableCorners.length)];
      markCell(grid[randomCorner], currentPlayer);
      checkWinner();
      currentPlayer = "X";
      return;
    }

    // Занять любую свободную клетку
    const availableCells = [...grid].filter((cell) => !cell.classList.contains('game-board__cell_type_x') && !cell.classList.contains('game-board__cell_type_o'));
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      markCell(availableCells[randomIndex], currentPlayer);
      checkWinner();
      currentPlayer = "X";
    }
  }

  function saveGame() {
    if (!isGameActive) {
      localStorage.removeItem('gameData');
      return;
    }

    const gameData = {
      settings: {
        mode: getSelectedMode(),
        difficulty: computerDifficulty,
      },
      cells: gridToCells(grid),
    };

    localStorage.setItem('gameData', JSON.stringify(gameData))
  }

  function loadGame() {
    const gameDataJSON = localStorage.getItem('gameData');
    if (!gameDataJSON) {
      return
    }

    const gameData = JSON.parse(gameDataJSON);

    for (const modeRadio of modeRadioButtons) {
      modeRadio.checked = modeRadio.value === gameData.settings.mode;
    }

    if (gameData.settings.mode === 'computer') {
      for (const difficultyRadio of difficultyRadioButtons) {
        difficultyRadio.checked = difficultyRadio.value === gameData.settings.difficulty;
      }
    }

    for (let i = 0; i < gameData.cells.length; i++) {
      markCell(grid[i], gameData.cells[i]);
    }
  }

  loadGame();

  grid.forEach((cell) => cell.addEventListener("click", handleCellClick));
  startButton.addEventListener("click", handleRestartClick);
  modeRadioButtons.forEach((radio) => radio.addEventListener("change", handleModeChange));
  difficultyRadioButtons.forEach((radio) => radio.addEventListener("change", handleDifficultyChange));
});
