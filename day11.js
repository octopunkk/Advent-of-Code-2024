const fs = require("fs");
const { stringify } = require("nodemon/lib/utils");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split(" ").map(Number)

const blink = stones => {
    const newStones = []
    stones.forEach(stone => {
        const strStone = stringify(stone)

        if (stone === 0) newStones.push(1)
        else if (strStone.length % 2 === 0) {
            newStones.push(Number(strStone.slice(0, strStone.length / 2)))
            newStones.push(Number(strStone.slice(strStone.length / 2)))
        }
        else{
            newStones.push(stone * 2024)
        }
    })
    return newStones
}

let stones = [...input]
for(let i = 0; i < 25; i++){
    stones = blink(stones)
}

console.log(`Part 1 : ${stones.length}`)

let stonesCompactinit = {}
const fillStonesCompact = stones => {
    stones.forEach(stone =>{
        addStone(stonesCompactinit, stone, 1)
    })
}
const addStone = (stonesCompact, stone, mult) => stonesCompact[stone] ? stonesCompact[stone] += mult : stonesCompact[stone] = mult

fillStonesCompact(input)

const blinkCompact = stonesCompact => {
    const newStones = {}
    const stones = Object.keys(stonesCompact).map(Number)
    stones.forEach(stone => {
        const mult = stonesCompact[stone]
        const strStone = stringify(stone)

        if (stone === 0) addStone(newStones, 1, mult)
        else if (strStone.length % 2 === 0) {
            addStone(newStones, Number(strStone.slice(0, strStone.length / 2)), mult)
            addStone(newStones, Number(strStone.slice(strStone.length / 2)), mult)
        }
        else{
            addStone(newStones, stone * 2024, mult)
        }
    })
    return newStones
}

for(let i = 0; i < 75; i++){
    stonesCompactinit = blinkCompact(stonesCompactinit)
}


console.log(`Part 2 : ${Object.values(stonesCompactinit).reduce((acc, current) => acc + current)}`)