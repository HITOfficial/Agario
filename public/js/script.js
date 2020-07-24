const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
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
blobPointArray = [];
const createBlob = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
const generateBlobPoint = () => {
    radius = 5;
    x = Math.floor(Math.random() * (canvas.width - (radius * 2)) + radius);
    y = Math.floor(Math.random() * (canvas.height - (radius * 2)) + radius);
    newBlobPoint.id += 1;
    newBlobPoint.x = x;
    newBlobPoint.y = y;
    newBlobPoint.radius = radius;
}
createBlobPoint = () => {
    for(i = 0; i < 20; i++){
        generateBlobPoint();
        createBlob(newBlobPoint.x, newBlobPoint.y, newBlobPoint.radius);
        blobPointArray.push(newBlobPoint);    
    }
}
createBlob(playerBlob.position.x, playerBlob.position.y, playerBlob.range.radius);
canvas.addEventListener('mousemove', (mouse) => {
    mouseCoord.x = mouse.screenX;
    mouseCoord.y = mouse.screenY;
    createBlob(mouseCoord.x + (playerBlob.range.radius / 2), mouseCoord.y - (playerBlob.range.radius * 3), playerBlob.range.radius);
    playerBlob.position = mouseCoord;
});