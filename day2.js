const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(line => line.split(" ").map(n => Number(n))); 
const isSafe = report => {
    let asc = false;
    let desc = false;
    for (let i = 1; i < report.length; i++){
        if(report[i] == report [i-1]) return [false, i]
        if(report[i] > report [i-1]) asc = true
        if(report[i] < report[i-1]) desc = true
        if(asc && desc) return [false, i]
        if(Math.abs(report[i]- report[i-1]) > 3 || Math.abs(report[i]- report[i-1]) < 1) return [false, i]
    }
    return [true]
}
const sum = input.filter(report => isSafe(report)[0]).length
console.log(`Part 1 : ${sum}`)

const sum2 = input.filter(report => {
    const firstTry = isSafe(report)
    if (firstTry[0]) return true
    const indexesToRemove = [firstTry[1], firstTry[1] -1, firstTry[1] -2]
    const altReports = indexesToRemove.map(i => report.filter((e, i2) => i2 != i))
    return altReports.some(version => isSafe(version)[0])
}).length
console.log(`Part 2 : ${sum2}`)

