const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let blobPointArray = [];
let playerBlobBodyPointArray = [];
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
    body : [
        {
            bodyId : 1,
            position : {
                x : canvas.width / 2,
                y : canvas.height / 2,
            },
            range : {
                radius : 20
            },
            score : {
                points : 40
            },
        }
    ],
    background : {
        color : '#ff0000'
    }
};
let mouseCoord = {
    x : null,
    y : null,
}
const createBlob = (x, y, radius, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if(color == undefined) ctx.fillStyle = '#000000'
    else ctx.fillStyle = color;
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
drawActualBlobBodyPoints = () => {
    playerBlobBodyPointArray.forEach(actualplayerBlobBodyPoint => {
        // console.log(actualBlobPoint)
        createBlob(actualplayerBlobBodyPoint.position.x, actualplayerBlobBodyPoint.position.y, actualplayerBlobBodyPoint.range.radius);
    })
}
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
    // console.log(`blob1: ${firstBlob.position.x}, ${firstBlob.position.y}`)
    // console.log(`blob2: ${actualBlobPoint.x}, ${actualBlobPoint.y}`)
    // console.log('distance: ' + twoRadiuses);
    return twoRadiuses;
}
const playerBlobSpeed = () => {
    if(playerBlob.body[0].position.x < mouseCoord.x) playerBlob.body[0].position.x +=1;
    if(playerBlob.body[0].position.x > mouseCoord.x) playerBlob.body[0].position.x -=1;
    if(playerBlob.body[0].position.y < mouseCoord.y) playerBlob.body[0].position.y +=1;
    if(playerBlob.body[0].position.y > mouseCoord.y) playerBlob.body[0].position.y -=1;
}
const updateBlobValues = (blob) => {
    blob.range.radius = Math.floor(blob.score.points / 2);
}
const drawPlayerBlob = () => {
    updateBlobValues(playerBlob.body[0]);
    playerBlobSpeed();
    playerBlob.body.forEach(actualBlobBody => {
        createBlob(actualBlobBody.position.x, actualBlobBody.position.y, actualBlobBody.range.radius, playerBlob.background.color);
    })
}
const eatBlobPoint = () => {
    blobPointArray.forEach(actualBlobPoint => {
        playerBlob.body.forEach(actualPlayerBlobBody => {
            distanceBetweenBlobs(actualPlayerBlobBody, actualBlobPoint);
            if(actualPlayerBlobBody.range.radius - actualBlobPoint.range.radius >= twoRadiuses){
                actualPlayerBlobBody.score.points += actualBlobPoint.score.points;
                blobPointArray.splice(blobPointArray.indexOf(actualBlobPoint),1);
            }
        })
    })
}
const drawCanvas = () => {
    clearCanvas();
    drawActualBlobPoints();
    drawPlayerBlob();
    drawActualBlobBodyPoints();
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
    drawActualBlobBodyPoints();
    fillCanvas();
    const intervalLimitOfBlobPoint = setInterval(() => {
        if(blobPointArray.length < 30) createNewBlobPoint(1);
    },1000);
    // function under looks meybe not the best but i have replaced following by indexOf actualPlayerBody becouse of reference problem so I decided to take last available item from playerBlobBodyPointArray 
    document.addEventListener('keydown', e => {
        if(e.keyCode == 87){
            playerBlob.body.forEach(actualPlayerBlobBody => {
                if(actualPlayerBlobBody.score.points > 20) {
                    actualPlayerBlobBody.score.points -= 10;
                    playerBlobBodyPointArray.push(removeReverence(actualPlayerBlobBody));
                    // console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)]);
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].score.points = 10;
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius = 10;
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].id = playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)];
                    delete playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].bodyId;
                    if(mouseCoord.x > actualPlayerBlobBody.position.x) {
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.x += actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;    
                        console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.x, mouseCoord.x)
                    }
                    if(mouseCoord.x < actualPlayerBlobBody.position.x) {
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.x -= actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;    
                        console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.x, mouseCoord.x)
                    }
                    if(mouseCoord.y > actualPlayerBlobBody.position.y) {
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.y += actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;    
                        console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.y, mouseCoord.y)
                    }
                    if(mouseCoord.y < actualPlayerBlobBody.position.y) {
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.y -= actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;    
                        console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.y, mouseCoord.y)
                    }
                    else if(mouseCoord.x == actualPlayerBlobBody.position.x && mouseCoord.y == actualPlayerBlobBody.position.y) {
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.x -= actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;
                        playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].position.y -= actualPlayerBlobBody.range.radius + 4 * playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius;    
                    }
                }
            })
        }
    })
}
window.onload = startGame;
createBlob(playerBlob.body[0].position.x, playerBlob.body[0].position.y, playerBlob.body[0].range.radius);
const removeReverence = (object) => {
    object = JSON.parse(JSON.stringify(object));
    return object;
}
const lastIndex = (array) => {
    last = array.length - 1
    return last;
}