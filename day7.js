const fs = require("fs");
const { stringify } = require("nodemon/lib/utils");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(l => {
    const raw = l.split(": ")
    return [Number(raw[0]), raw[1].split(" ").map(n => Number(n))]
})

const resolve = (acc, arr) => {
    if (arr.length == 0) return acc
    const head = arr.shift()
    return [resolve(acc + head, [...arr]), resolve(acc * head, [...arr])]
}

let sum = 0
input.forEach(equation => {
    const equation1cpy = [...equation[1]]
    const hd = equation1cpy.shift()
    const solutions = resolve(hd, equation1cpy).flat(Infinity)
    if (solutions.some(solution => solution == equation[0])) sum += equation[0]
})

console.log(`Part 1 : ${sum}`)

const resolveWithConcat = (acc, arr) => {
    if (arr.length == 0) return acc
    const head = arr.shift()
    const concat = Number(stringify(acc) + stringify(head))
    return [resolveWithConcat(acc + head, [...arr]), resolveWithConcat(acc * head, [...arr]), resolveWithConcat(concat, [...arr])]
}

let sum2 = 0
input.forEach(equation => {
    const equation1cpy = [...equation[1]]
    const hd = equation1cpy.shift()
    const solutions = resolveWithConcat(hd, equation1cpy).flat(Infinity)
    if (solutions.some(solution => solution == equation[0])) sum2 += equation[0]
})

console.log(`Part 2 : ${sum2}`)