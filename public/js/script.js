const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let blobPointArray = [];
let newBlobPointId = 0;
let playerBlob = {
    id : 1,
    position : {
        x : canvas.width / 2,
        y : canvas.height / 2,
    },
    range : {
        radius : 20
    }
};
let mouseCoord = {
    x : null,
    y : null,
}
const createBlob = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
// generating new coords of blobPoint
const generateNewBlobPoint = () => {
    blobPointArray.push({});
    newBlobPointId += 1;
    radius = 5;
    x = Math.floor(Math.random() * (canvas.width - (radius * 2)) + radius);
    y = Math.floor(Math.random() * (canvas.height - (radius * 2)) + radius);
    blobPointArray[blobPointArray.length - 1].id = newBlobPointId;
    blobPointArray[blobPointArray.length - 1].x = x;
    blobPointArray[blobPointArray.length - 1].y = y;
    blobPointArray[blobPointArray.length - 1].radius = radius;
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
        createBlob(actualBlobPoint.x, actualBlobPoint.y, actualBlobPoint.radius);
    })
}
createBlob(playerBlob.position.x, playerBlob.position.y, playerBlob.range.radius);
const mousePosition = () => {
    canvas.addEventListener('mousemove', (mouse) => {
        mouseCoord.x = mouse.screenX;
        mouseCoord.y = mouse.screenY;
    });
}
const playerBlobSpeed = () => {
    if(playerBlob.position.x < mouseCoord.x) playerBlob.position.x +=1;
    if(playerBlob.position.x > mouseCoord.x) playerBlob.position.x -=1;
    if(playerBlob.position.y < mouseCoord.y) playerBlob.position.y +=1;
    if(playerBlob.position.y > mouseCoord.y) playerBlob.position.y -=1;
}
const drawPlayerBlob = () => {
    playerBlobSpeed();
    createBlob(playerBlob.position.x, playerBlob.position.y - (playerBlob.range.radius * 3), playerBlob.range.radius);
}
const eatBlobPoint = () => {
    blobPointArray.forEach(actualBlobPoint => {
        if(    (playerBlob.position.x >= actualBlobPoint.x - Math.floor(playerBlob.range.radius))
            && (playerBlob.position.x <= actualBlobPoint.x + Math.floor(playerBlob.range.radius))
            && (playerBlob.position.y >= actualBlobPoint.y - Math.floor(playerBlob.range.radius))
            && (playerBlob.position.y <= actualBlobPoint.y + Math.floor(playerBlob.range.radius))){
                console.log(`Player ${playerBlob.position.x}, ${playerBlob.position.y}`)
                console.log(`blob ${actualBlobPoint.x}, ${actualBlobPoint.y}`)
                console.log(blobPointArray.indexOf(actualBlobPoint))
                blobPointArray.splice(blobPointArray.indexOf(actualBlobPoint),1);
        }
        // if(     (playerBlob.position.y >= actualBlobPoint.y - Math.floor(actualBlobPoint.radius / 3))
        //      && (playerBlob.position.y <= actualBlobPoint.y + Math.floor(actualBlobPoint.radius / 3))){
        //          console.log(`Player ${playerBlob.position.x}, ${playerBlob.position.y}`)
        //          console.log(`blob ${actualBlobPoint.x}, ${actualBlobPoint.y}`)
        //          console.log(blobPointArray.indexOf(actualBlobPoint))
        //          blobPointArray.splice(blobPointArray.indexOf(actualBlobPoint),1);
        //     }
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
    createNewBlobPoint();
    drawActualBlobPoints();
    fillCanvas();
}
window.onload = startGame;
