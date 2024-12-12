const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n").map(e => e.split(''))

let farm = JSON.parse(JSON.stringify(input))

const plotExists = (plot) => plot.x >= 0 && plot.y >= 0 && plot.x < input.length && plot.y < input[plot.x].length

const shouldAddPlot = (plot, area) => {
    if(!plotExists(plot)) return false
    if(area.size === 0) return true
    const plotValue = farm[plot.x][plot.y]
    const areaPlot = JSON.parse(area.values().next().value)
    const areaValue = farm[areaPlot.x][areaPlot.y]
    if(plotValue !== areaValue) return false
    if(area.has(JSON.stringify(plot))) return false
    return true
}

const shouldAddPerimeter = (plot, area) => {
    if(!plotExists(plot)) return true
    if(area.size === 0) return true
    const plotValue = farm[plot.x][plot.y]
    const areaPlot = JSON.parse(area.values().next().value)
    const areaValue = farm[areaPlot.x][areaPlot.y]
    if(plotValue !== areaValue) return true
    if(area.has(JSON.stringify(plot))) return false
    return false
}

const explore = (plot, area, perimeterIdx) => {
    const directions = [
        {x: plot.x, y: plot.y - 1, facing: "left"},
        {x: plot.x, y: plot.y + 1, facing: "right"},
        {x: plot.x - 1, y: plot.y, facing: "up"},
        {x: plot.x + 1, y: plot.y, facing: "down"},
    ]

    directions.forEach(dir => {
        if(shouldAddPerimeter({x: dir.x, y: dir.y}, area)) {
            sides[perimeterIdx] ? sides[perimeterIdx].push(dir) : sides[perimeterIdx] = [dir]
            perimeters[perimeterIdx] ? perimeters[perimeterIdx] += 1 : perimeters[perimeterIdx] = 1
        }
        if(shouldAddPlot({x: dir.x, y: dir.y}, area)){
            area.add(JSON.stringify({x: dir.x, y: dir.y}))
            explore(dir, area, perimeterIdx)
        }

    })
    return area
}

const nullifyAreaPlots = (area) => {
    area.forEach(rawPlot => {
        plot = JSON.parse(rawPlot)
        farm[plot.x][plot.y] = '.'
    })
}

const allAreas = []
const perimeters = []
const sides = []

for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[x].length; y++){
        if(farm[x][y] !== '.'){
            const plot = {x, y}
            const area = explore(plot, (new Set()).add(JSON.stringify(plot)), allAreas.length)
            nullifyAreaPlots(area)
            allAreas.push(area)
        }

    }
}

let price = 0
allAreas.forEach((area, i) => {
    price+= area.size * perimeters[i]
})

console.log(`Part 1 : ${price}`)

const allBigSides = []

const aligned = (s1, s2) =>{
    const onX = Math.abs(s1.x - s2.x) == 1
    const onY = Math.abs(s1.y - s2.y) == 1
    const sameX = s1.x == s2.x
    const sameY = s1.y == s2.y  
    return (onX && sameY || onY && sameX)
}

const isOnSameSide = (dot, contiguousSide) => {
    if(contiguousSide.length == 0) return true
    if(contiguousSide[0].facing !== dot.facing) return false
    if(contiguousSide.length == 1) return aligned(dot, contiguousSide[0])
    if(contiguousSide[0].x == contiguousSide[1].x) return dot.x == contiguousSide[0].x && contiguousSide.some(d => Math.abs(d.y - dot.y) == 1)
    if(contiguousSide[0].y == contiguousSide[1].y) return dot.y == contiguousSide[0].y && contiguousSide.some(d => Math.abs(d.x - dot.x) == 1)
}

sides.forEach(side => {
    let contiguousSides = [[]]
    side.sort((a, b) => a.x - b.x !== 0 ? a.x - b.x : a.y - b.y)
    side.forEach(dot => {
        let isOnASide = false
        contiguousSides.forEach(contiguousSide => {
            if(isOnSameSide(dot, contiguousSide)){
                contiguousSide.push(dot)
                isOnASide = true
            }
        })
        if(!isOnASide){
            contiguousSides.push([dot])
        }
        contiguousSides.sort((a, b) => b.length - a.length)

    })
    allBigSides.push(contiguousSides.length)
})

let price2 = 0
allAreas.forEach((area, i) => {
    price2+= area.size * allBigSides[i]
})
console.log(`Part 2 : ${price2}`)