// Game state object
const gameState = {
  playerTurn: 'red',
  emptySpaces: 42,
  turn: 0,
  winnerName: '',
  redName: '',
  yellowName: '',
  gameOver: false,
  winnerScore: 0,
  winner: null,
  grid: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
}

// Take the row and column number and update the game state.
function takeTurn (row, column) {
  if (gameState.gameOver === false && row !== null) {
    gameState.turn++
    gameState.emptySpaces--
    gameState.grid[row][column] = gameState.playerTurn
    if (gameState.playerTurn === 'red') {
      gameState.playerTurn = 'yellow'
      return gameState.playerTurn
    } else if (gameState.playerTurn === 'yellow') {
      gameState.playerTurn = 'red'
      return gameState.playerTurn
    }
  }
}

function getLowestAvailableRowInColumn (ColumnNumber, myGrid) {
  for (let i = 5; i >= 0; i--) {
    if (myGrid[i][ColumnNumber] === null) {
      return i
    }
  }
  return null
}

// Function to check if 4 cells are equal
function checkLineOfFour (a, b, c, d) {
  return (a !== null && a === b && a === c && a === d)
}

function checkWinner (grid) {
  // check columns
  for (let i = 0; i < 6 - 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j])) {
        gameState.gameOver = true
        gameState.winner = 'red'
        return gameState.winner
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j])) {
        gameState.gameOver = true
        gameState.winner = 'yellow'
        return gameState.winner
      }
    }
  }

  // Check rows
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7 - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'red'
        return gameState.winner
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'yellow'
        return gameState.winner
      }
    }
  }
  // Check for winner in top right to bottom diagonals
  for (let i = 0; i < 6 - 3; i++) {
    for (let j = 0; j < 7 - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2], grid[i + 3][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'red'
        return gameState.winner
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2], grid[i + 3][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'yellow'
        return gameState.winner
      }
    }
  }
  // Check for winner in top left to bottom diagonals
  for (let i = 6 - 3; i < 6; i++) {
    for (let j = 0; j < 7 - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2], grid[i - 3][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'red'
        return gameState.winner
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2], grid[i - 3][j + 3])) {
        gameState.gameOver = true
        gameState.winner = 'yellow'
        return gameState.winner
      }
    }
  }
  // check for no winners(when whole board!==null)
  let count = 0
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (grid[i][j] !== null) {
        count++
      }
    }
  }
  if (count === 42) {
    gameState.gameOver = true
    gameState.winner = 'nobody'
    return gameState.winner
  }
  console.log('checkWinner was called')
  gameState.gameOver = false
  return null
}

function getBoard () {
  console.log('getBoard was called')
  return gameState.grid
}

function resetGame () {
  gameState.grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  gameState.playerTurn = 'red'
  gameState.turn = 0
  gameState.emptySpaces = 42
  console.log('resetGame was called')
  gameState.winnerName = ''
  gameState.winnerScore = 0
  gameState.gameOver = false
  gameState.winner = null
}

if (typeof exports === 'object') {
  console.log("Running in Node")
  // Node. Does not work with strict CommonJS, but only CommonJS-like 
  // environments that support module.exports, like Node.
  module.exports = {
    checkWinner,
    resetGame,
    getLowestAvailableRowInColumn,
    checkLineOfFour,
    takeTurn,
    getBoard,
    gameState
  }
} else {
  console.log("Running in Browser")
}