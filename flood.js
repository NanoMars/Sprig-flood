/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Flood
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const red = "r"
const green = "g"
const blue = "b"
const yellow = "y"
const black = "x"

colours = [red, green, blue, yellow]

setLegend(
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ blue, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ black, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
)

function fillPlayerMap(x,y) {
    let newPlayerMap = [];
    for (let i = 0; i < y; i++) {
        let row = []
        
        for (let j = 0; j < x; j++) {
            row.push(false)
        }
      newPlayerMap.push(row)
    }
    newPlayerMap[0][0] = true
    return newPlayerMap
}

function setLevel(x, y) {
    const options = colours
    
    let newLevel = [];
    newLevel.length = 0

    for (let i = 0; i < y; i++) {
        let row = []

        for (let j = 0; j < x; j++) {
            let randomPick = Math.floor(Math.random() * options.length);
            let picked = options[randomPick];

            row.push(picked)
        }

        newLevel.push(row)
    }
    return newLevel
}

function testNeighbor(x, y, level, Plm, screenX, screenY) {
  if (x <= screenX - 2 && level[x + 1] && level[x + 1][y] == level[x][y]) {
    Plm[x + 1][y] = true;
  }
  if (x >= 1 && level[x - 1] && level[x - 1][y] == level[x][y]) {
    Plm[x - 1][y] = true;
  }
  if (y <= screenY - 0 && level[x][y + 1] && level[x][y + 1] == level[x][y]) {
    Plm[x][y + 1] = true;
  }
  if (y >= 1 && level[x][y - 1] && level[x][y - 1] == level[x][y]) {
    Plm[x][y - 1] = true;
  }

  for (let i = 0; i < Plm.length; i++) {
    console.log(Plm[i]);
  }
  return Plm;
}

function drawLevel(level, steps) {
    let levelString = ""
    clearText()
    addText(steps.toString(), { 
      x: 17,
      y: 1,
      color: "2"
    })
    addText("W", { 
      x: 17,
      y: 4,
      color: "6"
    })
    addText("A", { 
      x: 17,
      y: 6,
      color: "5"
    })
    addText("S", { 
      x: 17,
      y: 8,
      color: "4"
    })
    addText("D", { 
      x: 17,
      y: 10,
      color: "3"
    })

    for (let i = 0; i < level.length; i++) {
        let rowString = level[i].join("")

        levelString += rowString + "xx"+ "\n"
    }

    setMap(levelString)
}

function testAllPlayerNeighbors(pM, level, screenX, screenY) {
    for (let i = 0; i < pM.length; i++) {
        for (let j = 0; j < pM[i].length; j++) {
            if (pM[i][j] == true) {
              pM = testNeighbor(i, j, level, pM, screenX, screenY);
            }
        }
    }
}

function drawPlayerMap(playerMap, level, colour) {
    for (let i = 0; i < playerMap.length; i++) {
        for (let j = 0; j < playerMap[i].length; j++) {
            if (playerMap[i][j] == true) {
                level[i][j] = colour
                console.log(level[i][j])
            }
        }
    }
}

let steps = 15

function changeFlood(colour) {
    drawPlayerMap(playerMap, level, colour)
    drawLevel(level, steps)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, colour)
    drawLevel(level, steps)
    
    steps -= 1
    steps = Math.max(0, steps)

    if (steps == 0) {
        gameOver()
    }
}

let gameIsOver = false

function pressAnyKey() {
    if (gameIsOver == false) {
      return;
    }
    addText("Press any key", { 
        x: 3,
        y: 9,
        color: "2"
    })
}

function gameOver() {
    gameIsOver = true
    setMap("x")
    clearText()
    addText("Game Over", { 
        x: 5,
        y: 7,
        color: "2"
    })

    setTimeout(() => {
        pressAnyKey()
    }, 2500);
}

function youWin() {
  gameIsOver = true
  setMap("x")
  clearText()
  addText("You Win", { 
      x: 5,
      y: 7,
      color: "2"
  })

  setTimeout(() => {
      pressAnyKey()
  }, 2500);
}

function checkWin(level) {
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
            if (level[i][j] != level[0][0]) {
                return false
            }
        }
    }
    youWin()
}

function buttonPressed(input, gameIsOver, level = []) {
    if (gameIsOver == false) {
      if (input == "w") {
          changeFlood("y")
          checkWin(level)
      } else if (input == "a") {
          changeFlood("b")
          checkWin(level)
      } else if (input == "s") {
          changeFlood("g")
          checkWin(level)
      } else if (input == "d") {
          changeFlood("r")
          checkWin(level)
      } else if (input == "i" || input == "j" || input == "k" || input == "l") {
          resetGame()
      }
    } else {
        resetGame()
    }
}



let screenX = 8
let screenY = 8

let playerMap = []
playerMap.length = 0
playerMap = fillPlayerMap(screenX,screenY)



let level = []
level.length = 0



level = setLevel(screenX, screenY)


drawPlayerMap(playerMap, level, "g")
drawLevel(level, steps)

function resetGame() {
    playerMap = fillPlayerMap(screenX, screenY)
    level = setLevel(screenX, screenY)
    drawPlayerMap(playerMap, level, "g")
    steps = Math.floor(Math.random() * 10 + 10)
    drawLevel(level, steps)
    gameIsOver = false
}

onInput("w", () => {
    buttonPressed("w", gameIsOver, level)
})

onInput("a", () => {
    buttonPressed("a", gameIsOver, level)
})

onInput("s", () => {
    buttonPressed("s", gameIsOver, level)
})

onInput("d", () => {
    buttonPressed("d", gameIsOver, level)
})

onInput("i", () => {
    buttonPressed("i", gameIsOver)
})

onInput("j", () => {
    buttonPressed("j", gameIsOver)
})

onInput("k", () => {
    buttonPressed("k", gameIsOver)
})

onInput("l", () => {
    buttonPressed("l", gameIsOver)
})

afterInput(() => {
  
})  