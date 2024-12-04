const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n")

const checkHor = (x, y) => {
    if (y + 3 >= input[x].length) return false
    const word = [input[x][y], input[x][y+1], input[x][y+2], input[x][y+3]].join('')
    return word == 'XMAS' || word == 'SAMX'
}
const checkVert = (x, y) => {
    if(x + 3 >= input.length) return false
    const word = [input[x][y], input[x+1][y], input[x+2][y], input[x+3][y]].join('')
    return word == 'XMAS' || word == 'SAMX'
}

const checkRightDiagonal = (x, y) => {
    if (y + 3 >= input[x].length || x + 3 >= input.length) return false
    const word = [input[x][y], input[x+1][y+1], input[x+2][y+2], input[x+3][y+3]].join('')
    return word == 'XMAS' || word == 'SAMX'
}

const checkLeftDiagonal = (x, y) => {
    if (y - 3 < 0 ||  x + 3 >= input.length) return false
    const word = [input[x][y], input[x+1][y-1], input[x+2][y-2], input[x+3][y-3]].join('')
    return word == 'XMAS' || word == 'SAMX'
}

sum = 0;
for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[0].length; y++){
        if (checkHor(x, y)) sum+=1
        if (checkVert(x, y)) sum+=1
        if (checkLeftDiagonal(x, y)) sum+=1
        if (checkRightDiagonal(x, y)) sum+=1
    }
}

console.log(`Part 1 : ${sum}`)

const checkMas = (x, y) => {
    if (y + 2 >= input[x].length || x + 2 >= input.length) return false
    const word1 = [input[x][y], input[x+1][y+1], input[x+2][y+2]].join('')
    const word2 = [input[x+2][y], input[x+1][y+1], input[x][y+2]].join('')
    return (word1 == 'MAS' || word1 == 'SAM') && (word2 == 'MAS' || word2 == 'SAM')
}

sum2 = 0;
for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[0].length; y++){
        if (checkMas(x, y)) sum2+=1
    }
}

console.log(`Part 2 : ${sum2}`)

