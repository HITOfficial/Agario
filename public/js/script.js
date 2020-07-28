const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let blobPointArray = [];
let newBlobPointId = 0;
let twoRadiuses = 0;
let grater = {
    x : null,
    y : null,
}
let lower = {
    x : null,
    y : null,
}
let playerBlob = {
    id : 1,
    position : {
        x : canvas.width / 2,
        y : canvas.height / 2,
    },
    range : {
        radius : 20
    },
    score : {
        points : 40
    }
};
let mouseCoord = {
    x : null,
    y : null,
}
const createBlob = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.fill();
    ctx.stroke();
}
// generating new coords of blobPoint
const generateNewBlobPoint = () => {
    blobPointArray.push({});
    newBlobPointId += 1;
    radius = 5;
    x = Math.floor(Math.random() * (canvas.width - (radius * 2)) + radius);
    y = Math.floor(Math.random() * (canvas.height - (radius * 2)) + radius);
    blobPointArray[blobPointArray.length - 1].id = newBlobPointId;
    blobPointArray[blobPointArray.length - 1].position = {x : x,
                                                          y : y};
    blobPointArray[blobPointArray.length - 1].range = {radius : radius};
    blobPointArray[blobPointArray.length - 1].score = {points: Math.floor(radius / 2)};
}

// adding new BlobPoint to Blobs array
createNewBlobPoint = (limit) => {
    if(limit == undefined) {
        for(i = 0; i < 7; i++){
            generateNewBlobPoint();
        }
    }
    else {
        for(i = 0; i < limit; i++){
            generateNewBlobPoint();
        }
    }
}
// to refresh available blobPoints from array on canvas
drawActualBlobPoints = () => {
    blobPointArray.forEach(actualBlobPoint => {
        // console.log(actualBlobPoint)
        createBlob(actualBlobPoint.position.x, actualBlobPoint.position.y, actualBlobPoint.range.radius);
    })
}
createBlob(playerBlob.position.x, playerBlob.position.y, playerBlob.range.radius);
const mousePosition = () => {
    canvas.addEventListener('mousemove', (mouse) => {
        mouseCoord.x = mouse.x;
        mouseCoord.y = mouse.y;
    });
}
const distanceBetweenBlobs = (firstBlob, secondBlob) => {
    twoRadiuses = 0;
    if(firstBlob.position.x >= secondBlob.position.x){
        grater.x = firstBlob.position.x;
        lower.x = secondBlob.position.x;
    } else {
        grater.x = secondBlob.position.x;
        lower.x = firstBlob.position.x;
    }
    if(firstBlob.position.y >= secondBlob.y){
        grater.y = firstBlob.position.y;
        lower.y = secondBlob.position.y;
    } else {
        grater.y = secondBlob.position.y;
        lower.y = firstBlob.position.y;
    }
    twoRadiuses = Math.floor(Math.sqrt(Math.pow((grater.x - lower.x),2) + Math.pow((grater.y - lower.y),2)));
    // console.log(`Mouse ${firstBlob.position.x}, ${firstBlob.position.y}`)
    // console.log(`blob ${actualBlobPoint.x}, ${actualBlobPoint.y}`)
    // console.log('distance: ' + twoRadiuses);
    return twoRadiuses;
}
const playerBlobSpeed = () => {
    if(playerBlob.position.x < mouseCoord.x) playerBlob.position.x +=1;
    if(playerBlob.position.x > mouseCoord.x) playerBlob.position.x -=1;
    if(playerBlob.position.y < mouseCoord.y) playerBlob.position.y +=1;
    if(playerBlob.position.y > mouseCoord.y) playerBlob.position.y -=1;
}
const drawPlayerBlob = () => {
    playerBlobSpeed();
    createBlob(playerBlob.position.x, playerBlob.position.y, playerBlob.range.radius);
}
const eatBlobPoint = () => {
    blobPointArray.forEach(actualBlobPoint => {
        distanceBetweenBlobs(playerBlob, actualBlobPoint);
        if(playerBlob.range.radius - actualBlobPoint.range.radius >= twoRadiuses){
            playerBlob.score.points += actualBlobPoint.score.points;
            playerBlob.range.radius = Math.floor(playerBlob.score.points / 2);
            blobPointArray.splice(blobPointArray.indexOf(actualBlobPoint),1);
        }
    })
}
const drawCanvas = () => {
    clearCanvas();
    drawActualBlobPoints();
    drawPlayerBlob();
    eatBlobPoint();
}
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const fillCanvas = () => {
    setInterval(drawCanvas, 1000/60);
}
const startGame = () => {
    drawPlayerBlob();
    mousePosition();
    createNewBlobPoint(10);
    drawActualBlobPoints();
    fillCanvas();
    // document.querySelector('canvas').addEventListener('click', distanceBetweenPlayerBlobAndBlobPoint);
}
window.onload = startGame;
