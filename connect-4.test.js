// Importing module
const { redirect } = require('express/lib/response')
const {
  checkWinner,
  resetGame,
  getLowestAvailableRowInColumn,
  checkLineOfFour,
  takeTurn,
  getBoard,
  gameState
} = require('./connect-4.js')

// Testing checkWinner Function
// describe('When calling the checkWinner function', () => {
// describe('CheckWinner will return either red, yellow, nobody or null when called', () => {
//  scenarios = [
//    [[
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      ['red', null, null, null, null, null, null],
//      ['red', 'yellow', null, null, null, null, null]
//    ], null],
//    [[
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      ['red',null, null, null, null, null, null],
//      ['red', null, null, null, null, null, null],
//      ['red', null, null, null, null, null, null],
//      ['red', null, null, null, null, null, null]
//    ], 'red'],
//    [[
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      [null, null, null, null, null, null, null],
//      ['yellow', 'yellow', 'yellow', 'yellow', null, null, null]
//    ], 'yellow'],
//    [[
//      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
//      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow'],
//      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
//      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow'],
//      ['red', 'yellow', 'red', 'red', 'yellow', 'red', 'red'],
//      ['yellow', 'red', 'yellow', 'yellow', 'red', 'yellow', 'yellow']
//    ], 'nobody']
//  ]
//  it.each(scenarios)("when checkWinner is is called", (grid, expected) => {
//    const actual = checkWinner(grid)
//    expect(actual).toBe(expected)
//  })
// })
// })

let grid =[]

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