// Importing module
const {
  checkWinner,
  resetGame,
  getLowestAvailableRowInColumn,
  checkLineOfFour,
  takeTurn,
  getBoard,
  gameState
} = require('./connect-4.js')

 //Testing checkWinner Function
let grid = []

 describe('When calling the checkWinner function', () => {
  scenarios = [
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', 'yellow', null, null, null, null, null]
    ], null],
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red',null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null]
    ], 'red'],
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['yellow', 'yellow', 'yellow', 'yellow', null, null, null]
    ], 'yellow'],
    [[
      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow'],
      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow'],
      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow']
    ], 'nobody']
  ]
  it.each(scenarios)('CheckWinner will return either red, yellow, nobody or null when called', (grid, expected) => {
    const actual = checkWinner(grid)
    expect(actual).toBe(expected)
  })
 })

describe('when 4 same coloured discs are placed consecutively in a row', () => {
  // arrange
  const scenarios = []
  const color = ['red', 'yellow']
  const colIndex = [
    { startCol: 0, endCol: 4 },
    { startCol: 1, endCol: 5 },
    { startCol: 2, endCol: 6 },
    { startCol: 3, endCol: 7 }
  ]

  function rowWins (startCol, endCol, color) {
    for (let i = 0; i < 6; i++) {
      grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
      for (let j = startCol; j < endCol; j++) {
        grid[i][j] = color
      }
      scenarios.push([grid, color])
    }
  }
  colIndex.forEach((colIndex)=> {
    rowWins(colIndex.startCol, colIndex.endCol, color[0])
  })

  colIndex.forEach((colIndex)=> {
    rowWins(colIndex.startCol, colIndex.endCol, color[1])
  })

  it.each(scenarios)('checkWinner should return red or yellow ', (grid, expected) => {
    const actual = checkWinner(grid)
    expect(actual).toBe(expected)
  })
})

describe('when 4 same coloured discs are placed consecutively in a column', () => {
  // arrange
  const scenarios = []
  const color = ['red', 'yellow']
  const rowIndex = [
    { startRow: 0, endRow: 4 },
    { startRow: 1, endRow: 5 },
    { startRow: 2, endRow: 6 }
  ]

  function colWins (startRow, endRow, color) {
    for (let i = 0; i < 7; i++) {
      grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
      for (let j = startRow; j < endRow; j++) {
        grid[j][i] = color
      }
      scenarios.push([grid, color])
    }
  }
  rowIndex.forEach((rowIndex)=> {
    colWins(rowIndex.startRow, rowIndex.endRow, color[0])
  })

  rowIndex.forEach((rowIndex)=> {
    colWins(rowIndex.startRow, rowIndex.endRow, color[1])
  })
  it.each(scenarios)('checkWinner should return red or yellow ', (grid, expected) => {
    const actual = checkWinner(grid)
    expect(actual).toBe(expected)
  })
})

describe('when 4 same coloured discs are placed consecutively in a diagonal', () => {
  // arrange
  let scenarios = []
  let col = [0,1,2,3]
  let grid = []
  color=['red', 'yellow']
  
  function checkDiag(col, color) {
    for (let i = 0; i < 3; i++) {
      grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
      grid[i][col] = color
      grid[i + 1][col + 1] = color
      grid[i + 2][col + 2] = color
      grid[i + 3][col + 3] = color
      scenarios.push([grid, color])
    }
  }
  
  col.forEach( (col)=> {
    checkDiag(col, color[0])
  })
  
  col.forEach( (col)=> {
    checkDiag(col, color[1])
  })
  it.each(scenarios)('checkWinner should return red or yellow ', (grid, expected) => {
    const actual = checkWinner(grid)
    expect(actual).toBe(expected)
  })
})


describe('when 4 same coloured discs are placed consecutively in a reverse diagonal', () => {
  // arrange
  let scenarios = []
  let col = [6,5,4,3]
  let grid = []
  color=['red', 'yellow']
  function checkReverseDiag(col, color) {
    for (let i = 0; i < 3; i++) {
      grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
      grid[i][col] = color
      grid[i + 1][col - 1] = color
      grid[i + 2][col - 2] = color
      grid[i + 3][col - 3] = color
      scenarios.push([grid, color])
    }
  }
  col.forEach( (col)=> {
    checkReverseDiag(col, color[0])
  })
  col.forEach( (col)=> {
    checkReverseDiag(col, color[1])
  })
  it.each(scenarios)('checkWinner should return red or yellow ', (grid, expected) => {
    const actual = checkWinner(grid)
    expect(actual).toBe(expected)
  })
})

// Tests for takeTurn Function:
describe('when takeTurn function is called', () => {
  beforeEach(()=> {
    gameState.playerTurn = 'red'
    gameState.grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    gameState.currentGuess = null
    gameState.gameOver = false
  })
  it('should return red if current player is yellow',() =>{
    let row=1
    let col=2
    gameState.playerTurn = 'yellow'
    const expectedOutput ='red'
    const actualOutput = takeTurn(row, col)
    expect(actualOutput).toBe(expectedOutput)
  })
})

// Test for getLowestAvailableRowInColumn function
describe('When getLowestAvailableRowInColumn function is called', () => {
  
  beforeEach(() => {
    grid = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
  })

  test('should return 5', () => {
    //  arrange
    const pieces = ['yellow', 'yellow', 'yellow', 'red', 'red']
    const ColumnNumber = 1
    for (let i = 0; i < pieces.length; i++) {
      pieces.forEach(piece => {
        grid[i][ColumnNumber] = piece
      })
    }
    // Act
    const output = getLowestAvailableRowInColumn(ColumnNumber, grid)
    const expectedOutput = 5
    //  assert
    expect(output).toBe(expectedOutput)
  })
})
