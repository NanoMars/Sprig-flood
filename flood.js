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
6666666666666666` ]
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
    const options = ["r", "g", "b", "y"];
    
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
  if (y <= screenY && level[x][y + 1] && level[x][y + 1] == level[x][y]) {
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

function drawLevel(level) {
    let levelString = ""

    for (let i = 0; i < level.length; i++) {
        let rowString = level[i].join("")

        levelString += rowString + "\n"
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

function printPlayerMap(playerMap) {
    for (let i = 0; i < playerMap.length; i++) {
        console.log(playerMap[i])
    }
}

function printLevel(level) {
    for (let i = 0; i < level.length; i++) {
        console.log(level[i])
    }
}

let screenX = 10
let screenY = 8

let playerMap = []
playerMap.length = 0
playerMap = fillPlayerMap(screenX,screenY)

let level = []
level.length = 0

level = setLevel(screenX, screenY)


drawPlayerMap(playerMap, level, "g")
drawLevel(level)
printLevel(level)

onInput("w", () => {
    drawPlayerMap(playerMap, level, "y")
    drawLevel(level)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, "y")
    drawLevel(level)
})

onInput("a", () => {
    drawPlayerMap(playerMap, level, "b")
    drawLevel(level)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, "b")
    drawLevel(level)
})

onInput("s", () => {
    drawPlayerMap(playerMap, level, "g")
    drawLevel(level)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, "g")
    drawLevel(level)
})

onInput("d", () => {
    drawPlayerMap(playerMap, level, "r")
    drawLevel(level)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, "r")
    drawLevel(level)
})

afterInput(() => {
  
})  