const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(l => l.split(""))
const antennas = {}
input.forEach((l, x) => l.forEach((a, y) => {
    if (a == '.') return
    antennas[a] ? antennas[a].push({x, y}) : antennas[a] = [{x, y}]
}))

const withinBounds = antinode => {
    return antinode.x >= 0 && antinode.x < input.length && antinode.y >= 0 && antinode.y < input[0].length
}

const findAntinodes = SFAntennas => {
    const antinodes = new Set()
    SFAntennas.forEach((antenna, i) => {
        for(let j = i + 1; j < SFAntennas.length; j++){
            const antinode1 = {x: 2 * antenna.x - SFAntennas[j].x , y: 2 * antenna.y - SFAntennas[j].y}
            const antinode2 = {x: 2 * SFAntennas[j].x - antenna.x , y: 2 * SFAntennas[j].y - antenna.y}
            if (withinBounds(antinode1)) antinodes.add(`${antinode1.x}-${antinode1.y}`)
            if (withinBounds(antinode2)) antinodes.add(`${antinode2.x}-${antinode2.y}`)
        }
    })
    return antinodes
}
const someAntinodes = Object.values(antennas).reduce((acc, SFAntennas) => acc.union(findAntinodes(SFAntennas)), new Set())
console.log(`Part 1 : ${someAntinodes.size}`)

const findMoreAntinodes = SFAntennas => {
    const antinodes = new Set()
    SFAntennas.forEach((antenna, i) => {
        for(let j = i + 1; j < SFAntennas.length; j++){
            let i2 = 0
            while(true){
                const antinode = {x: (i2 + 1) * antenna.x - i2 * SFAntennas[j].x , y: (i2 + 1) * antenna.y - i2 * SFAntennas[j].y}
                if (withinBounds(antinode)) {
                    antinodes.add(`${antinode.x}-${antinode.y}`)
                    i2++
                }
                else{
                    break
                }
            }
            let i3 = 0
            while(true){
                const antinode = {x: (i3 + 1)* SFAntennas[j].x - i3 * antenna.x , y: (i3 + 1) * SFAntennas[j].y - i3 * antenna.y}
                if (withinBounds(antinode)) {
                    antinodes.add(`${antinode.x}-${antinode.y}`)
                    i3++
                }
                else{
                    break
                }
            }
        }
    })
    return antinodes
}

const allAntinodes = Object.values(antennas).reduce((acc, SFAntennas) => acc.union(findMoreAntinodes(SFAntennas)), new Set())
console.log(`Part 2 : ${allAntinodes.size}`)