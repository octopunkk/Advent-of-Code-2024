const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n\n")

const arcades = input.map(arcade => {
    const match = [...arcade.matchAll(/(\d+)/g)]
    return {
        A: {x: Number(match[0][0]), y: Number(match[1][0])},
        B: {x: Number(match[2][0]), y: Number(match[3][0])},
        Prize: {x: Number(match[4][0]), y: Number(match[5][0])}
    }
})

const getPrize = arcade => {
    const maxA = Math.min(Math.min(Math.ceil(arcade.Prize.x / arcade.A.x), Math.ceil(arcade.Prize.y / arcade.A.y)))
    const maxB = (Math.min(Math.ceil(arcade.Prize.x / arcade.B.x), Math.ceil(arcade.Prize.y / arcade.B.y)))
    for(let b = Math.min(maxB, 100); b >= 0; b--){
        for(let a = 0; a < Math.min(maxA, 100); a++){
            if(a * arcade.A.x + b * arcade.B.x === arcade.Prize.x && a * arcade.A.y + b * arcade.B.y === arcade.Prize.y) return a * 3 + b
        }
    }
    return 0
}

const tokens = arcades.reduce((acc, arcade) => acc + getPrize(arcade),0)
console.log(`Part 1 : ${tokens}`)

const getPrizeWithMath = ({A, B, Prize}) => {
    Prize.x += 10000000000000
    Prize.y += 10000000000000
    let b = (Prize.x - Prize.y * (A.x / A.y))/(B.x - B.y * (A.x / A.y))
    let a = (Prize.x - B.x * b) / A.x
    b = Number(b.toPrecision(15))
    a = Number(a.toPrecision(15))

    if(Number.isInteger(a) && Number.isInteger(b)) {
        return 3*a + b 
    }
    else return 0
}

const tokens2 = arcades.reduce((acc, arcade) => acc + getPrizeWithMath(arcade),0)
console.log(`Part 2 : ${tokens2}`)