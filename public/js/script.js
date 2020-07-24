const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let blobPointArray = [];
let newBlobPoint = {
    id : 0,
    x : null,
    y : null,
    radius : null
}
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
    radius = 5;
    x = Math.floor(Math.random() * (canvas.width - (radius * 2)) + radius);
    y = Math.floor(Math.random() * (canvas.height - (radius * 2)) + radius);
    newBlobPoint.id += 1;
    newBlobPoint.x = x;
    newBlobPoint.y = y;
    newBlobPoint.radius = radius;
}
// adding new BlobPoint to Blobs array
createNewBlobPoint = (limit) => {
    if(limit == undefined) {
        for(i = 0; i < 20; i++){
            generateNewBlobPoint();
            blobPointArray.push(newBlobPoint);    
            }
    }
    else {
        for(i = 0; i < limit; i++){
            generateNewBlobPoint();
            blobPointArray.push(newBlobPoint);    
        }
    }
}
createNewBlobPoint();
// to refresh available blobPoints from array on canvas
drawActualBlobPoints = () => {
    blobPointArray.forEach( actualBlobPoint => {
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

const drawCanvas = () => {
    clearCanvas();
    drawActualBlobPoints();
    drawPlayerBlob();
}
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const fillCanvas = () => {
    setInterval(drawCanvas, 1000/100);
}
const startGame = () => {
    drawPlayerBlob();
    mousePosition();
    createNewBlobPoint(100);
    fillCanvas();
}
window.onload = startGame;