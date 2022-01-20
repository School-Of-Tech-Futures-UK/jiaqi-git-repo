
const name1 = window.prompt('Player 1 please enter your name: ')
document.getElementById('player1-name').innerText = name1
const name2 = window.prompt('Player 2 please enter your name: ')
document.getElementById('player2-name').innerText = name2

// board as a multidimensional array where game moves will be stored
let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]
const row = 6
const column = 7

// Game state object
const gameState = {
  playerTurn: 'red',
  emptySpaces: 42,
  turn: 0,
  winner: ''
}

// Object to store scores
const scores = { red: 0, yellow: 0 }

// function to get scores from server
async function fetchScores () {
  const resp = await fetch('http://localhost:3000/connect-4')
  const respJson = await resp.json()
  scores.red = respJson.red
  scores.yellow = respJson.yellow
}
fetchScores()

// Function to post scores to the server
async function postScores (scores) {
  const resp = await fetch('http://localhost:3000/connect-4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scores)
  })
  const respJson = resp.json()
  console.log('Success:', respJson)
}

// Turn function
function takeTurn (event) {
  const id = event.target.id
  const colNum = id[8]
  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
  console.log(`Lowest available row: ${lowestAvailableRow}`)

  // Alternate turns between yellow and red
  if (lowestAvailableRow !== null && checkWinner(grid) === null) {
    gameState.turn++
    gameState.emptySpaces--
    if (gameState.playerTurn === 'red') {
      grid[lowestAvailableRow][colNum] = 'red'
      document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red'
      gameState.playerTurn = 'yellow'
    } else {
      grid[lowestAvailableRow][colNum] = 'yellow'
      document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'yellow'
      gameState.playerTurn = 'red'
    }
  }
  // Checking For Winner and display winner message
  const winner = checkWinner(grid)
  if (winner) {
    if (typeof winner !== 'string' || !['red', 'yellow', 'nobody'].includes(winner)) {
      throw "Expecting 'checkWinner' to return null or one of the strings 'red', 'yellow' or 'nobody'. Actually received: " + winner
    }
    
    // update score and send to server
    scores[winner] += gameState.emptySpaces
    postScores (scores)
    //fetch('http://localhost:3000/connect-4', {
    //  method: 'POST',
    //  headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  body: JSON.stringify(scores)
    //})
    //  .then(response => response.json())
    //  .then(data => console.log('Success:', data))

    const winnerName = document.getElementById('winner-name')
    winnerName.innerText = winner
    const winnerDisplay = document.getElementById('winner-display')
    winnerDisplay.style.display = 'block'
    document.getElementById('red-score').innerText = scores.red
    document.getElementById('yellow-score').innerText = scores.yellow
    document.getElementById('scoreboard').style.display = 'block'

    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      for (let colIndex = 0; colIndex < column; colIndex++) {
        document.getElementById(`row${rowIndex}-col${colIndex}`).removeAttribute('onclick')
        document.getElementById(`row${rowIndex}-col${colIndex}`).removeEventListener('click', takeTurn)
      }
    }
    console.log(gameState)
    fetchScores()
  }
}

// Function to get lowest available row in column j
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

// Check for winners
function checkWinner (grid) {
  // check columns
  for (let i = 0; i < row - 3; i++) {
    for (let j = 0; j < column; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j])) {
        return 'red'
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j])) {
        return 'yellow'
      }
    }
  }

  // Check rows
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3])) {
        return 'red'
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3])) {
        return 'yellow'
      }
    }
  }

  // Check for winner in top right to bottom diagonals
  for (let i = 0; i < row - 3; i++) {
    for (let j = 0; j < column - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2], grid[i + 3][j + 3])) {
        return 'red'
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2], grid[i + 3][j + 3])) {
        return 'yellow'
      }
    }
  }

  // Check for winner in top left to bottom diagonals
  for (let i = row - 3; i < row; i++) {
    for (let j = 0; j < column - 3; j++) {
      if (grid[i][j] === 'red' && checkLineOfFour(grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2], grid[i - 3][j + 3])) {
        return 'red'
      } else if (grid[i][j] === 'yellow' && checkLineOfFour(grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2], grid[i - 3][j + 3])) {
        return 'yellow'
      }
    }
  }

  // check for no winners(when whole board!==null)
  let count = 0
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (grid[i][j] !== null) {
        count++
      }
    }
  }
  if (count === 42) {
    return 'nobody'
  }
  console.log('checkWinner was called')
  return null
}

// Reset grid when button is clicked
function resetGrid(event) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      grid[i][j] = null
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
      const winnerName = document.getElementById('winner-name')
      winnerName.innerText = ''
      const winnerDisplay = document.getElementById('winner-display')
      winnerDisplay.style.display = 'None'
      document.getElementById('red-score').innerText = ''
      document.getElementById('yellow-score').innerText = ''
      document.getElementById('scoreboard').style.display = 'None'
      document.getElementById(`row${i}-col${j}`).addEventListener('click', takeTurn)
    }
  }
  gameState.playerTurn = 'red'
  gameState.turn = 0
  gameState.emptySpaces = 42
  console.log('resetGame was called')
  fetchScores()
}
