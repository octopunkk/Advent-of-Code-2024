const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n\n").map(e => e.split("\n"))
const rulesRaw = input[0].map(r => r.split("|").map(n => Number(n)))
const updates = input[1].map(u => u.split(",").map(n => Number(n)))

const rules = {}
rulesRaw.forEach(r => {
    rules[r[0]] ? rules[r[0]].push(r[1]) : rules[r[0]] = [r[1]]
})

const updateIsValid = update => {
    return update.every((page, i) => {
        if (!rules[page]) return true
        const indexesToCheck = rules[page].map(p => update.indexOf(p)).filter(e => e !== -1)
        return indexesToCheck.every(index => index > i)
    })
}

let sum = 0;
updates.forEach(update => {
    if(updateIsValid(update)) sum += update[Math.floor(update.length / 2)]
})

console.log(`part 1: ${sum}`)

let sum2 = 0
updates.forEach(update => {
    if(!updateIsValid(update)) {
        sorted = update.sort((a, b) => rules[a] ? rules[a].includes(b) ? -1 : 1 : 0)
        sum2 += sorted[Math.floor(sorted.length / 2)]
    }
})

console.log(`part 2: ${sum2}`)
