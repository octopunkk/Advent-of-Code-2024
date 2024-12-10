const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(l => l.split("").map(Number))
const trailHeads = []
for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[x].length; y++){
        if (input[x][y] === 0) trailHeads.push({x,y})
    }
}

const validDirection = (path, node) => {
    if(node.x < 0 || node.y < 0 || node.x >= input.length || node.y >= input[0].length) return false
    const lastNodeCoord = path[path.length-1]
    const lastNode = input[lastNodeCoord.x][lastNodeCoord.y]
    if(input[node.x][node.y] !== lastNode + 1)return false
    if(path.some(n => n.x === node.x && n.y === node.y)) return false
    return true
}

const findPaths = (path, allPaths)=> {
    if(path.length === 10) return allPaths.push(path)
    const current = path[path.length - 1]
    const directions = [
        {x: current.x, y: current.y - 1},
        {x: current.x, y: current.y + 1},
        {x: current.x - 1, y: current.y},
        {x: current.x + 1, y: current.y}
    ]
    directions.forEach(dir => {
        if(validDirection(path, dir)){
            return findPaths([...path, dir], allPaths)
        }
    })
    return allPaths
}

const countDifferentEnds = allPaths =>{
    const ends = []
    allPaths.forEach(path => {
        if( !ends.some(e => e.x === path[9].x && e.y === path[9].y)) ends.push(path[9])
    })
    return ends.length
}

let sum = 0
trailHeads.forEach(trailHead => {
    const paths = findPaths([trailHead], [])
    sum += countDifferentEnds(paths)

})
console.log(`Part 1 : ${sum}`)

let ratings = 0
trailHeads.forEach(trailHead => {
    ratings += findPaths([trailHead], []).length
})
console.log(`Part 2 : ${ratings}`)

