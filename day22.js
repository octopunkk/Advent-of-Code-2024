const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(Number)

const mix = (n1, n2) => n1 ^ n2
const prune = n => n % 16777216n

const getSecret = prev => {
    let tmp = prev * 64n
    let secret = mix(tmp, prev)
    secret = prune(secret)
    tmp = secret / 32n
    secret = mix(tmp, secret)
    secret = prune(secret)
    tmp = secret * 2048n
    secret = mix(tmp, secret)
    secret = prune(secret)
    return secret
}

const variations = {}
const sequences = {}

const secrets = input.map(initialNum => {
    initialNum = BigInt(initialNum)
    let secret = getSecret(initialNum)
    let price = Number(secret.toString().slice(-1))
    variations[initialNum] = [NaN]

    for(let i = 1; i < 2000; i++){
        secret = getSecret(secret)
        prevPrice = price
        price = Number(secret.toString().slice(-1))
        variations[initialNum].push(price - prevPrice)
        if(variations[initialNum].length >= 4){
            const sequence = variations[initialNum].slice(-4).join('')
            if(!sequences[sequence]) sequences[sequence] = {}
            if(!sequences[sequence][initialNum]) sequences[sequence][initialNum] = price
        }
    }
    return secret
})

console.log(`Part 1 : ${secrets.reduce((acc, c) => acc + c)}`)

let best = 0
Object.values(sequences).forEach(sequence => {
    const sum = Object.values(sequence).reduce((acc, v) => acc + v)
    if(sum > best) {
        best = sum
    }
})
console.log(`Part 2 : ${best}`)