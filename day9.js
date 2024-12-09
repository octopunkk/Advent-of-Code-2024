const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("").map(Number)


const getFreeSpaceAndExpandedSize = (input) => {
    let expandedIndex = 0
    // freeSpace = indexes of freeSpace in extended file
    // Example : 0..111....22222 -> freeSpace = [1, 2, 6, 7, 8, 9]
    const freeSpace = []
    input.forEach((n, i) => {
        isFile = i%2 == 0;
        if (!isFile){
            for(let j = expandedIndex; j< expandedIndex + n; j++){
                freeSpace.push(j)
            }
        }
        expandedIndex += n
    })
    return [freeSpace, expandedIndex]
}

const [freeSpace, expandedSize] = getFreeSpaceAndExpandedSize(input)

const getCheckSum = (freeSpace, expandedSize) => {
    let checkSum = 0
    let expandedIndex = expandedSize
    let freeSpaceCpy = [...freeSpace]
    for(let i = input.length - 1; i >= 0; i--){
        const isFile = i%2 == 0;
        const id = Math.floor(i / 2)
        const n = input[i]
        if(isFile){
            for(let j = 1; j <= n; j++){
                const lastFreeSpace = freeSpaceCpy.shift()
                const space = lastFreeSpace && lastFreeSpace < expandedIndex - j ? lastFreeSpace : expandedIndex - j 
                checkSum+= space * id 
            }
        }
        expandedIndex -= n
    }
    return checkSum
}

console.log(`Part 1 : ${getCheckSum(freeSpace, expandedSize)}`)

const getFreeSpaceV2 = (input) => {
    let expandedIndex = 0
    // freeSpace = indexes and size of freeSpace in extended file
    // Example : 0..111....22222 -> freeSpace = freeSpace[1] = 2, freeSpace[6] = 4
    const freeSpace = []
    input.forEach((n, i) => {
        isFile = i%2 == 0;
        if (!isFile){
            freeSpace[expandedIndex] = n
        }
        expandedIndex += n
    })
    return freeSpace
}

const freeSpaceV2 = getFreeSpaceV2(input)

const getCheckSumV2 = (freeSpace, expandedSize) => {
    let checkSum = 0
    let expandedIndex = expandedSize
    for(let i = input.length - 1; i >= 0; i--){
        const isFile = i%2 == 0;
        const id = Math.floor(i / 2)
        const n = input[i]
        if(isFile){
            freeSpaceIndex = freeSpace.findIndex(freeSpace => n <= freeSpace)
            if(freeSpaceIndex) {
                if(n < freeSpace[freeSpaceIndex]) {
                    freeSpace[freeSpaceIndex + n] = freeSpace[freeSpaceIndex] - n
                }
                freeSpace[freeSpaceIndex] = 0

            }
            for(let j = 1; j <= n; j++){
                const space = freeSpaceIndex >= 0 && freeSpaceIndex < expandedIndex - j ? freeSpaceIndex + j - 1: expandedIndex - j 
                checkSum+= space * id 
            }

        }
        expandedIndex -= n
    }
    return checkSum
}
console.log(`Part 2 : ${getCheckSumV2(freeSpaceV2, expandedSize)}`)


