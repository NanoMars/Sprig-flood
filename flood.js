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

function buttonPressed(colour) {
    drawPlayerMap(playerMap, level, colour)
    drawLevel(level, steps)
    testAllPlayerNeighbors(playerMap, level, screenX, screenY)
    drawPlayerMap(playerMap, level, colour)
    drawLevel(level, steps)
}



let screenX = 8
let screenY = 8

let playerMap = []
playerMap.length = 0
playerMap = fillPlayerMap(screenX,screenY)



let level = []
level.length = 0

let steps = 15

level = setLevel(screenX, screenY)


drawPlayerMap(playerMap, level, "g")
drawLevel(level, steps)

function resetGame() {
    playerMap = fillPlayerMap(screenX, screenY)
    level = setLevel(screenX, screenY)
    drawPlayerMap(playerMap, level, "g")
    drawLevel(level, steps)
    steps = random(10, 20)
}

onInput("w", () => {
    buttonPressed("y")
})

onInput("a", () => {
    buttonPressed("b")
})

onInput("s", () => {
    buttonPressed("g")
})

onInput("d", () => {
    buttonPressed("r")
})

afterInput(() => {
  
})  