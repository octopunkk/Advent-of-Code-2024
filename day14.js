const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n")

let robots = input.map(line => {
    const match = [...line.matchAll(/(-?\d+)/g)]
    return {
        p: {x: Number(match[0][0]), y: Number(match[1][0])},
        v: {x: Number(match[2][0]), y: Number(match[3][0])},
    }
})

const roomWidth = 101
const roomHeight = 103

const displayRoom = robots => {
    const room = new Array(roomHeight)
    for(let i =0; i<roomHeight; i++){
        room[i] = new Array(roomWidth).fill('.')
    }
    robots.forEach(robot => {
        room[robot.p.y][robot.p.x] == '.' ? room[robot.p.y][robot.p.x] = 1 : room[robot.p.y][robot.p.x] +=1
    })
    room.forEach(row => console.log(row.join('')))
}


const move = robot => {
    let newX = robot.p.x + robot.v.x
    while(newX < 0) newX = roomWidth + newX
    newX = newX % roomWidth
    let newY = robot.p.y + robot.v.y
    while(newY < 0) newY = roomHeight + newY
    newY = newY % roomHeight
    return {...robot, p: {x: newX, y: newY}}
}

let robotsCpy = JSON.parse(JSON.stringify(robots))
for(let i=0; i<100; i++){
    robotsCpy = robotsCpy.map(move)
}

const quadrants = [0,0,0,0]

robotsCpy.forEach(robot => {
    if(robot.p.x < Math.floor(roomWidth / 2)){
        if(robot.p.y < Math.floor(roomHeight / 2)) quadrants[0] += 1
        else if(robot.p.y >  Math.floor(roomHeight / 2)) quadrants[1] += 1
    }
    else if(robot.p.x > Math.floor(roomWidth / 2)){
        if(robot.p.y <  Math.floor(roomHeight / 2)) quadrants[2] += 1
        else if(robot.p.y >  Math.floor(roomHeight / 2)) quadrants[3] += 1
    }
})

console.log(`Part 1 : ${quadrants.reduce((acc, v) => acc * v)}`)

const findEasterEgg = async (robots, i) => {
    // Finds if there's an unusual amount of aligned robots ?
    const xHistogram = []
    const yHistogram = []

    robots.forEach(robot => {
        xHistogram[robot.p.x] ?  xHistogram[robot.p.x] +=1 : xHistogram[robot.p.x] = 1
        yHistogram[robot.p.y] ?  yHistogram[robot.p.y] +=1 : yHistogram[robot.p.y] = 1
    })

    if(yHistogram.some(y => y > 32)){
        displayRoom(robots)
        console.log(i)
        await new Promise(r => setTimeout(r, 500))
    }
}


const main = async () => {
    for(let i = 0; i < 10000; i++){
    robots = robots.map(move)
    await findEasterEgg(robots, i)
}}
main()



