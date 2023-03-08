let turn = "X";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let modePc = false;

$(document).ready(() => {
  $(document).on("click", ".btn", (event) => {
    $(".cell").removeClass("X O disabled winner blinking");
    $(".cell").text("");
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    turn = "X";
    $(".heading").text("Welcome to the Tic-Tac-Toe game ");
  });

  $(document).on("click", "#flexSwitchCheck", (event) => {
    $("body").toggleClass("pc-body two-playes-body");
    $(".form-check-label").text("Mode:1P");
    if ($("body").hasClass("pc-body")) {
      modePc = true;
    } else {
      $(".form-check-label").text("Mode:2P");
      modePc = false;
    }
  });

  $("body").on("click", ".cell:not(.X):not(.O):not(.disabled)", (event) => {
    $(event.target).addClass(turn);
    $(event.target).text(turn);
    let cell = $(event.target);
    let currentRow = cell.data("row");
    let currentCol = cell.data("col");
    board[currentRow][currentCol] = turn;

    if (modePc) {
      if (checkForWin(turn)) {
        $(".heading").text(`${turn} is the winner!`);
        $(".cell").addClass("disabled");
      } else if (board.flat().every((cell) => cell !== "")) {
        $(".heading").text("Tie game!");
      } else {
        turn = "O";
        setTimeout(() => {
          let emptyCells = $(".cell:not(.X):not(.O):not(.disabled)");
          let randomIndex = Math.floor(Math.random() * emptyCells.length);
          let randomCell = emptyCells.eq(randomIndex);
          randomCell.addClass("O");
          randomCell.text("O");
          let row = randomCell.data("row");
          let col = randomCell.data("col");
          board[row][col] = "O";
          if (checkForWin("O")) {
            $(".heading").text("Computer wins!");
            $(".cell").addClass("disabled");
          } else if (board.flat().every((cell) => cell !== "")) {
            $(".heading").text("Tie game!");
          } else {
            turn = "X";
          }
        }, 300);
      }
    } else {
      if (checkForWin(turn)) {
        $(".heading").text(`${turn} is the winner!`);
        $(".cell").addClass("disabled");
      } else if (board.flat().every((cell) => cell !== "")) {
        $(".heading").text("Tie game!");
      } else {
        turn = turn === "X" ? "O" : "X";
      }
    }

    function checkForWin(currentTurn) {
      for (let rows = 0; rows < 3; rows++) {
        if (
          board[rows][0] === currentTurn &&
          board[rows][1] === currentTurn &&
          board[rows][2] === currentTurn
        ) {
          // get the cells in the winning row
          let winningRows = $(`.cell[data-row=${rows}]`);
          // add the "winner" and "blinking" classes to each cell
          winningRows.addClass("winner blinking");
          return true;
        }
      }
      for (let col = 0; col < 3; col++) {
        if (
          board[0][col] === currentTurn &&
          board[1][col] === currentTurn &&
          board[2][col] === currentTurn
        ) {
          let winningCells = $(`.cell[data-col=${col}]`);
          // add the "winner" and "blinking" classes to each cell
          winningCells.addClass("winner blinking");
          return true;
        }
      }
      if (
        board[0][0] === currentTurn &&
        board[1][1] === currentTurn &&
        board[2][2] === currentTurn
      ) {
        // get the cells in the winning row
        let winningCells = $(
          ".cell[data-row='0'][data-col='0'], .cell[data-row='1'][data-col='1'], .cell[data-row='2'][data-col='2']"
        );
        // add the "winner" and "blinking" classes to each cell
        winningCells.addClass("winner blinking");
        return true;
      }

      if (
        board[0][2] === currentTurn &&
        board[1][1] === currentTurn &&
        board[2][0] === currentTurn
      ) {
        // get the cells in the winning row
        let winningCells = $(
          ".cell[data-row='0'][data-col='2'], .cell[data-row='1'][data-col='1'], .cell[data-row='2'][data-col='0']"
        );
        // add the "winner" and "blinking" classes to each cell
        winningCells.addClass("winner blinking");
        return true;
      }

      return false;
    }
  });

  $("body").on("click", ".cell.X, .cell.O , .cell.disabled", (event) => {
    $(".heading").text("Cannot place a symbol in this cell.");
  });
});
