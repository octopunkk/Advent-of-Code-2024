const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" });
const mulRegex = /mul\((\d+),(\d+)\)/g;
const matches = [...input.matchAll(mulRegex)];
const result = matches.reduce((acc, match) => {
    return acc + Number(match[1]) * Number(match[2]);
    }, 0);
console.log(`Part 1: ${result}`);

const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;
const doIndexes = [...input.matchAll(doRegex)].map(x => x.index );
const dontIndexes = [...input.matchAll(dontRegex)].map(x => x.index);
const executeMul = mul => {
    const mulIndex = mul.index;
    if(mulIndex < doIndexes[0] && mulIndex < dontIndexes[0]) return true
    let prevDo = 0
    let prevDont = 0
    doIndexes.forEach((doIndex) => {if(doIndex < mulIndex) prevDo = doIndex})
    dontIndexes.forEach((dontIndex) => {if(dontIndex < mulIndex) prevDont = dontIndex})
    return prevDo > prevDont
}

const result2 = matches.reduce((acc, match) => acc + (executeMul(match) ? Number(match[1]) * Number(match[2]) : 0), 0)
console.log(`Part 2: ${result2}`);