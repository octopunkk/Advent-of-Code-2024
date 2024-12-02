const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(line => line.split("   "));
const firstList = input.map(line => Number(line[0])).sort()
const secondList = input.map(line => Number(line[1])).sort()

const sum = firstList.reduce((acc, currentValue, i) => acc + Math.abs(currentValue - secondList[i]), 0)
console.log(`Part 1 : ${sum}`)

const occurences = {}
secondList.forEach(val => occurences[val] ? occurences[val] += 1 : occurences[val] = 1)
const similarities = firstList.reduce((acc, currentValue) => acc + (occurences[currentValue] ? occurences[currentValue] : 0) * currentValue, 0)
console.log(`Part 2 : ${similarities}`)