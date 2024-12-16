const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(e => e.split(""))

const start = {}
const end = {}
const nodes = []
for (let x = 0; x < input.length; x++){
    for (let y = 0; y < input[x].length; y++){
        if (input[x][y] == 'S'){
            start.x = x
            start.y = y
            start.dir = "east"
        }
        if (input[x][y] == 'E'){
            end.x = x
            end.y = y
        }
        if (input[x][y] !== '#'){
            nodes.push({x, y, dir: 'north'})
            nodes.push({x, y, dir: 'south'})
            nodes.push({x, y, dir: 'east'})
            nodes.push({x, y, dir: 'west'})
        }
    }
}

const isValid = node => {
    const withinBounds = node.x >= 0 && node.y >= 0 && node.x < input.length && node.y < input[0].length
    if(!withinBounds) return false
    return input[node.x][node.y] !== '#'
}

const dijkstra = (input, start) => {
    let distances = {};
    let visited = new Set();
    let paths = {}

    nodes.forEach(node => distances[JSON.stringify(node)] = Infinity);
    distances[JSON.stringify(start)] = 0;
    paths[JSON.stringify(start)] = [[]]
    
    while(nodes.length) {
        nodes.sort((a, b) => distances[JSON.stringify(a)] - distances[JSON.stringify(b)])
        const closestNode = nodes.shift()
        const closestNodeStr = JSON.stringify(closestNode)
        if (distances[closestNodeStr] === Infinity) break;
        visited.add(closestNodeStr);

        const neighbors = [
            {x: closestNode.x + 1, y: closestNode.y, dir: "north"},
            {x: closestNode.x - 1, y: closestNode.y, dir: "south"},
            {x: closestNode.x, y: closestNode.y + 1, dir: "east"},
            {x: closestNode.x, y: closestNode.y - 1, dir: "west"}
        ]
        neighbors.forEach(neighbor => {
            const neighborStr = JSON.stringify(neighbor)
            if(!visited.has(neighborStr) && isValid(neighbor)){
                const cost = closestNode.dir === neighbor.dir ? 1 : 1001
                const newDistance = distances[closestNodeStr] + cost
                const newPaths = paths[closestNodeStr].map(path => [...path, neighbor])

                if(newDistance <= distances[neighborStr]){
                    distances[neighborStr] = newDistance
                    paths[neighborStr] ? paths[neighborStr].push(...newPaths) : paths[neighborStr] = [...newPaths]
                }
            }
        })
    }
    return {distances, paths}
}


const {distances, paths} = dijkstra(input, start)
const ends = [
    {x: end.x, y: end.y, dir: 'north'},
    {x: end.x, y: end.y, dir: 'south'},
    {x: end.x, y: end.y, dir: 'east'},
    {x: end.x, y: end.y, dir: 'west'},
]
const shortestDistances = ends.map(end => distances[JSON.stringify(end)])
const shortestPaths = ends.flatMap(end => paths[JSON.stringify(end)])

const bestSeats = new Set()
shortestPaths.forEach(p => {
    if(p){
        p.forEach(e => bestSeats.add(JSON.stringify({x: e.x, y: e.y})))
    }
})


console.log(`Part 1 : ${Math.min(...shortestDistances)}`)
console.log(`Part 2 : ${bestSeats.size}`)