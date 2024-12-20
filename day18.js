const fs = require("fs");
const bytes = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(e => e.split(",").map(Number))
const inputSize = 1024
const gridSize = 70
const firstBytes = bytes.slice(0, inputSize)

const heuristics = (p1, p2) => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

const isObstacle = (x, y, obstacles) => {
    return obstacles.some(obs => obs[0] === x && obs[1] === y)
}

const isValidPath = (pos, grid) => {
    if(pos.x < 0 || pos.y < 0 || pos.y >= grid.length || pos.x >= grid[0].length) return false
    return grid[pos.y][pos.x] === ' '
}

const getNeighbors = (pos, grid) => {
    const neighbors = [
        {x: pos.x - 1, y: pos.y, f: 0, g: 0, h: 0},
        {x: pos.x + 1, y: pos.y, f: 0, g: 0, h: 0},
        {x: pos.x, y: pos.y - 1, f: 0, g: 0, h: 0},
        {x: pos.x, y: pos.y + 1, f: 0, g: 0, h: 0}
    ]
    return neighbors.filter(n => isValidPath(n, grid))
}

const initGrid = (bytes, gridSize) => {
    const grid = new Array(gridSize)

    for(let y = 0; y < gridSize; y++){
        grid[y] = new Array(gridSize)

        for(let x = 0; x < gridSize; x++){
            const point = isObstacle(x, y, bytes) ? '█' : ' '
            grid[y][x] = point
        }
    }
    return grid
}

const search = (grid) => {
    let openSet = [];
    let closedSet = [];
    let start = {x: 0, y: 0, f: 0, g: 0, h: 0};
    let end = {x: gridSize, y: gridSize};
    let path = [];

    openSet.push(start)

    while(openSet.length > 0){
        let lowestIndex = 0
        openSet.forEach((pos, index) => {
            if(pos.f < openSet[lowestIndex].f) lowestIndex = index
        })

        let current = openSet[lowestIndex]

        if(current.x === end.x && current.y === end.y){
            let temp = current 
            path.push(temp);
            while(temp.parent) {
                path.push(temp.parent)
                temp = temp.parent
            }
            return path
        }
        openSet.splice(lowestIndex, 1)
        closedSet.push(current)
        const neighbors = getNeighbors(current, grid)
        for(let neighbor of neighbors) {
            if(!closedSet.some(e => e.x === neighbor.x && e.y === neighbor.y)){
                let betterPath = false;
                let possibleG = current.g + 1

                if(!openSet.some(e => e.x === neighbor.x && e.y === neighbor.y)){
                    neighbor.g = possibleG;
                    betterPath = true
                    openSet.push(neighbor)
                }
                else {
                    if(possibleG < neighbor.g){
                        betterPath = true;
                    }
                }
                if(betterPath){
                    neighbor.h = heuristics(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current
                }
                
            }
        }
    }
    return [];
}

const grid = initGrid(firstBytes, gridSize + 1)
const result = search(grid)


console.log(`Part 1 : ${result.length - 3}`)

const displayResults = (result, grid) => {
    const resultGrid = new Array(gridSize)
    grid.forEach((line, y) => {
        resultGrid[y] = new Array(gridSize)
        line.forEach((e, x) => {
            if(result.some(r => r.x == x && r.y == y)){
                resultGrid[y][x] = '▮'
            }
            else{
                resultGrid[y][x] = e
            }
        })
    })
    resultGrid.forEach(line => console.log(line.join('')))
}

let pathExists = true
let lastByteIndex = 2700
while(pathExists){
    const newBytes = bytes.slice(0, lastByteIndex)
    const newGrid = initGrid(newBytes, gridSize + 1)
    const result = search(newGrid)
    // displayResults(result, newGrid)
    // console.log('--------------------------')
    if(result.length === 0){
        pathExists = false
    }
    else{
        lastByteIndex +=1
    }
}

console.log(`Part 2 : ${bytes[lastByteIndex -1]}`)
