const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(l => l.split(""))
let start = {}
for (let x = 0; x < input.length; x++){
    for (let y = 0; y < input[x].length; y++){
        if (input[x][y] == '^'){
            start.x = x
            start.y = y
        }
    }
}

let visited = new Set()
visited.add(`${start.x}-${start.y}`)

const walk = (pos, dir, map, stops) => {
    if (dir == 'finished'){
        return 0
    }
    if (pos.x !== start.x || pos.y !== start.y){
        if(stops.has(`${pos.x}-${pos.y}-${dir}`)){
            return 1
        }
        else{
            stops.add(`${pos.x}-${pos.y}-${dir}`)
        }
    }
    if (dir == 'up') {
        let x = pos.x
        let y = pos.y
        let obstacle = false
        while (!obstacle){
            x = x-1
            if (x < 0) {
                obstacle = true
                return walk(pos, 'finished', map, stops)
            }
            if (map[x][y] == '#') {
                obstacle = true
                return walk({x: x+1, y}, 'right', map, stops)
            }
            visited.add(`${x}-${y}`)
        }
    }
    if (dir == 'right') {
        let x = pos.x
        let y = pos.y
        let obstacle = false
        while (!obstacle){
            y = y+1
            if (y >= map[x].length) {
                obstacle = true
                return walk(pos, 'finished', map, stops)
            }
            if (map[x][y] == '#') {
                obstacle = true
                return walk({x, y: y-1}, 'down', map, stops)
            }
            visited.add(`${x}-${y}`)
        }
    }
    if (dir == 'down') {
        let x = pos.x
        let y = pos.y
        let obstacle = false
        while (!obstacle){
            x = x+1
            if (x >= map.length) {
                obstacle = true
                return walk(pos, 'finished', map, stops)
            }
            if (map[x][y] == '#') {
                obstacle = true
                return walk({x: x-1, y}, 'left', map, stops)
            }
            visited.add(`${x}-${y}`)
        }
    }
    if (dir == 'left') {
        let x = pos.x
        let y = pos.y
        let obstacle = false
        while (!obstacle){
            y = y-1
            if (y < 0) {
                obstacle = true
                return walk(pos, 'finished', map, stops)
            }

            if (map[x][y] == '#') {
                obstacle = true
                return walk({x, y: y+1}, 'up', map, stops)
            }
            visited.add(`${x}-${y}`)
        }
    }
}

walk(start, 'up', input, new Set())

console.log(`Part 1 : ${visited.size}`)

let possibleObstructions = []
visited.forEach(v => {
    match = [...v.matchAll(/(\d+)-(\d+)/g)]
    possibleObstructions.push({x: Number(match[0][1]), y: Number(match[0][2])})

})

let sum = 0
possibleObstructions.forEach(obstruction => {
    const map = JSON.parse(JSON.stringify(input));
    map[obstruction.x][obstruction.y] = '#'
    sum += walk(start, 'up', map, new Set())
})


console.log(`Part 2 : ${sum}`)
