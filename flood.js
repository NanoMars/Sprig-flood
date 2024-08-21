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

setSolids([])



function fillPlayerMap(x,y) {
    newPlayerMap = []
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

function testNeighbor(x,y, level, playerMap, screenX, screenY) {
    if (x <= screenX - 2 && level[x + 1][y] == level[x][y]) {
        playerMap[x + 1][y] = true
    }
    if (x >= 1 && level[x - 1][y] == level[x][y]) {
        playerMap[x - 1][y] = true
    }
    if ( y <= screenY - 2 && level[x][y + 1] == level[x][y]) {
        playerMap[x][y + 1] = true
    }
    if (y >= 1 && level[x][y - 1] == level[x][y] ) {
        playerMap[x][y - 1] = true
    }
    return playerMap
}

function drawLevel(level) {
    let levelString = ""

    for (let i = 0; i < level.length; i++) {
        let rowString = level[i].join("")

        levelString += rowString + "\n"
    }

    setMap(levelString)
}

function testAllPlayerNeighbors(playerMap) {
    // test all player neighbors!
}

let screenX = 20
let screenY = 16

let playerMap = []

level = setLevel(screenX, screenY)
drawLevel(level)
playerMap = fillPlayerMap(screenX,screenY)

testNeighbor(0,0, level, playerMap, screenX, screenY)

console.log(playerMap[1])









onInput("s", () => {
  
})

afterInput(() => {
  
})