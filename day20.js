const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(e => e.split(''))

let start = {}
let end = {}
input.forEach((line, y) => line.forEach((e, x) => {if(e !== '#') {
    if (e == 'S') start = {x, y, cost: 0}
    if (e == 'E') end = {x, y}
}}))

const initialRun = () => {
    let current = start
    let visited = []
    const track = []

    visited.push(current)
    track.push(current)
    while(!(current.x === end.x && current.y === end.y)){
        let neighbors = [
            {x: current.x + 1, y: current.y},
            {x: current.x - 1, y: current.y},
            {x: current.x, y: current.y - 1},
            {x: current.x, y: current.y + 1},
        ]
        for(let neighbor of neighbors){
            if(neighbor.x < 0 || neighbor.y < 0 || neighbor.y >= input.length || neighbor.x >= input[0].length ) continue
            if(visited.some(e => e.x == neighbor.x && e.y == neighbor.y)) continue
            if(input[neighbor.y][neighbor.x] === '.' || input[neighbor.y][neighbor.x] === 'E'){
                neighbor.cost = current.cost + 1
                track.push(neighbor)
                current = neighbor
                visited.push(current)
                break
            }
        }
    }
    return track
}

const track = initialRun()

const isValidPath = (pos, grid) => {
    return (pos.x >= 0 && pos.y >= 0 && pos.y < grid.length && pos.x < grid[0].length)
}

const getCost = (pos, track) => {
    return track.find(e => e.x === pos.x && e.y === pos.y)?.cost
} 

const manhattan = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

const getMoreNeighbors = (pos, n) => {
    const neighbors = []
    for(let i = 0; i <= n ; i++){
        for(let j = i ; j >= 0; j--){
            if(i == 0 && j == 0) continue
            neighbors.push({x: pos.x + j , y: pos.y + i - j, step: manhattan(pos, {x: pos.x + j, y:pos.y + i - j})})
            neighbors.push({x: pos.x - j , y: pos.y + i - j, step: manhattan(pos, {x: pos.x - j, y:pos.y + i - j})})
            neighbors.push({x: pos.x - j , y: pos.y - i + j, step: manhattan(pos, {x: pos.x - j, y:pos.y - i + j})})
            neighbors.push({x: pos.x + j , y: pos.y - i + j, step: manhattan(pos, {x: pos.x + j, y:pos.y - i + j})})
        }
    }
    return neighbors.filter(n => isValidPath(n, input))
}

const findCheats = (picoseconds, treshold) => {
    const cheats = new Set()
    track.forEach(p => { 
        const neighbors = getMoreNeighbors(p, picoseconds)
        neighbors.forEach(neighbor => {
            const cost = getCost(neighbor, track)
            if (cost - p.cost >= treshold + neighbor.step){
                cheats.add(`${p.x},${p.y}-${neighbor.x},${neighbor.y}`)
            }
        })
    })
    return cheats.size
}

console.log(`Part 1 : ${findCheats(2, 100)}`)
console.log(`Part 2 : ${findCheats(20, 100)}`)