const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let blobPointArray = [];
let playerBlobBodyPointArray = [];
let playerBlobBodyPointIntervalsArray = [];
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
                points : 80
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
const playerBlobSpeed = (actualPlayerBlobBody) => {
    // if(actualPlayerBlobBody.position.x < mouseCoord.x) actualPlayerBlobBody.position.x +=1;
    // if(actualPlayerBlobBody.position.x > mouseCoord.x) actualPlayerBlobBody.position.x -=1;
    // if(actualPlayerBlobBody.position.y < mouseCoord.y) actualPlayerBlobBody.position.y +=1;
    // if(actualPlayerBlobBody.position.y > mouseCoord.y) actualPlayerBlobBody.position.y -=1;
    // if(actualPlayerBlobBody.position.x < mouseCoord.x && actualPlayerBlobBody.position.y == mouseCoord.y) actualPlayerBlobBody.position.x += Math.sqrt((1 + 1), 2);
    // if(actualPlayerBlobBody.position.x > mouseCoord.x && actualPlayerBlobBody.position.y == mouseCoord.y) actualPlayerBlobBody.position.x -= Math.sqrt((1 + 1), 2);
    // if(actualPlayerBlobBody.position.y < mouseCoord.y && actualPlayerBlobBody.position.x == mouseCoord.x) actualPlayerBlobBody.position.y += Math.sqrt((1 + 1), 2);
    // if(actualPlayerBlobBody.position.y > mouseCoord.y && actualPlayerBlobBody.position.x == mouseCoord.x) actualPlayerBlobBody.position.y -= Math.sqrt((1 + 1), 2);
}
const updateBlobValues = (blob) => {
    blob.range.radius = Math.floor(blob.score.points / 2);
}
const drawPlayerBlob = () => {
    playerBlob.body.forEach(actualPlayerBlobBody => {
        playerBlobSpeed(actualPlayerBlobBody)
        createBlob(actualPlayerBlobBody.position.x, actualPlayerBlobBody.position.y, actualPlayerBlobBody.range.radius, playerBlob.background.color);
        updateBlobValues(actualPlayerBlobBody);
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
const eatPlayerBlobBody = () => {
    playerBlobBodyPointArray.forEach(actualBlobBodyPoint => {
        playerBlob.body.forEach(actualPlayerBlobBody => {
            distanceBetweenBlobs(actualPlayerBlobBody, actualBlobBodyPoint);
            if(actualPlayerBlobBody.range.radius - actualBlobBodyPoint.range.radius >= twoRadiuses){
                actualPlayerBlobBody.score.points += actualBlobBodyPoint.score.points;
                playerBlobBodyPointArray.splice(playerBlobBodyPointArray.indexOf(actualBlobBodyPoint),1);
            }
        })
    })
}
const drawCanvas = () => {
    clearCanvas();
    drawActualBlobPoints();
    drawActualBlobBodyPoints();
    eatBlobPoint();
    eatPlayerBlobBody();
    drawPlayerBlob();
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
                if(actualPlayerBlobBody.score.points > 30) {
                    actualPlayerBlobBody.score.points -= 10;
                    playerBlobBodyPointArray.push(removeReverence(actualPlayerBlobBody));
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].score.points = 10;
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].range.radius = 10;
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].id = lastIndex(playerBlobBodyPointArray); // create an id of every element from this array, becouse i'll need to look right in this object
                    playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].move = true
                    delete playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].bodyId;
                    playerBlobBodyPointArray.forEach(playerBlobBodyPoint => { //I'm forEaching now becouse i'll need corectly id'ies i all separated functions
                    if(playerBlobBodyPoint.move == true) { // i made also once more identification to do not move others BlobBodyPoints
                        playerBlobBodyPoint.move = false;
                        console.log(playerBlobBodyPoint)
                        if(playerBlobBodyPoint.id == playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].id) // here I can do this, without errors, but in setInterval in correctly Id'ies
                        idOfElement = playerBlobBodyPoint.id;
                        // if(mouseCoord.x > actualPlayerBlobBody.position.x) {
                        //     playerBlobBodyPointArray[idOfElement].position.x += actualPlayerBlobBody.range.radius;    
                        //     endingX = playerBlobBodyPointArray[idOfElement].position.x + 4 * playerBlobBodyPointArray[idOfElement].range.radius
                        //     if(endingX > canvas.width) endingX = canvas.width
                        //     moveBloBAutomaticaly = setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPointArray[idOfElement].position.x, endingX);
                        //     updateCoordXInterval = setInterval(updateCordX, 1000/60, idOfElement);
                        // }
                        if(mouseCoord.x < actualPlayerBlobBody.position.x) {
                            playerBlobBodyPointArray[idOfElement].position.x -= actualPlayerBlobBody.range.radius;   
                            endingX = playerBlobBodyPointArray[idOfElement].position.x - 4 * playerBlobBodyPointArray[idOfElement].range.radius
                            if(endingX > canvas.width) endingX = canvas.width
                            // setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPoint.position.x ,playerBlobBodyPoint.position.x, playerBlobBodyPoint.position.x - 4 * playerBlobBodyPoint.range.radius)
                            console.log('tu x: ' + playerBlobBodyPoint.position.x, 'tu y: ' + playerBlobBodyPoint.position.y);
                            window["interval" + idOfElement] = setInterval(updateCordX, 1000, playerBlobBodyPoint.position.x ,playerBlobBodyPoint.position.x, playerBlobBodyPoint.position.x - 4 * playerBlobBodyPoint.range.radius, playerBlobBodyPoint.id);
                        }
                        // if(mouseCoord.y > actualPlayerBlobBody.position.y) {
                        //     playerBlobBodyPointArray[idOfElement].position.y += actualPlayerBlobBody.range.radius;    
                        //     endingY = playerBlobBodyPointArray[idOfElement].position.y + 4 * playerBlobBodyPointArray[idOfElement].range.radius
                        //     if(endingY > canvas.height) endingY = canvas.height;
                        //     moveBloBAutomaticaly = setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPointArray[idOfElement].position.y, endingY)
                        //     updateCoordYInterval = setInterval(updateCordY, 1000/60, idOfElement);
                        // }
                        // if(mouseCoord.y < actualPlayerBlobBody.position.y) {
                        //     playerBlobBodyPointArray[idOfElement].position.y -= actualPlayerBlobBody.range.radius;    
                        //     endingY = playerBlobBodyPointArray[idOfElement].position.y - 4 * playerBlobBodyPointArray[idOfElement].range.radius
                        //     if(endingY > canvas.height) endingY = canvas.height;
                        //     playerBlobBodyPointArray.moveBloBAutomaticaly = setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPointArray[idOfElement].position.y, endingY)
                        //     playerBlobBodyPointArray.updateCoordYInterval = setInterval(updateCordY, 1000, idOfElement);
                        // }
                        // if(mouseCoord.x == actualPlayerBlobBody.position.x && mouseCoord.y == actualPlayerBlobBody.position.y) {
                        //     playerBlobBodyPointArray[idOfElement].position.x -= actualPlayerBlobBody.range.radius;
                        //     endingX = playerBlobBodyPointArray[idOfElement].position.x - 4 * playerBlobBodyPointArray[idOfElement].range.radius
                        //     if(endingX > canvas.width) endingX = canvas.width;
                        //     playerBlobBodyPointArray[idOfElement].position.y -= actualPlayerBlobBody.range.radius;    
                        //     endingY = playerBlobBodyPointArray[idOfElement].position.y + 4 * playerBlobBodyPointArray[idOfElement].range.radius
                        //     if(endingY > canvas.height) endingY = canvas.height;
                        //     moveBloBAutomaticaly = setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPointArray[idOfElement].position.x, endingX)
                        //     moveBloBAutomaticaly = setInterval(moveBloBAutomaticalyInsideInterval, 1000, playerBlobBodyPointArray[idOfElement].position.y, endingY)
                        //     updateCoordXInterval = setInterval(updateCordX, 1000/60, idOfElement);
                        //     playerBlobBodyPointArray.indexOf(actualPlayerBlobBody)
                        //     updateCoordYInterval = setInterval(updateCordY, 1000/60, idOfElement);
                        // }
                        console.log(playerBlobBodyPoint)
                    }   
                    })
                    console.log(playerBlobBodyPointArray[lastIndex(playerBlobBodyPointArray)].moveBloBAutomaticaly)
                }
            })
        }
    })
}
// const removeElementFromArray = (array, element) => {
// array.pop(element);
// }
// removeElementFromArrayTimeout = setTimeout(removeElementFromArray, 5000)
window.onload = startGame;
const removeReverence = (object) => {
    object = JSON.parse(JSON.stringify(object));
    return object;
}
const lastIndex = (array) => {
    last = array.length - 1
    return last;
}
const moveBloBAutomaticalyInsideInterval = (blob, actualCoord, endCoord, id) => {
    // console.log('to  kurwa to ' + blob);
    // console.log(endCoord)
    // console.log(playerBlobBodyPoint)
    if(actualCoord >= endCoord) {
        actualCoord -= 50;
        if(actualCoord <= endCoord){
            clearInterval(window["interval" + idOfElement]);
            console.log(`konczeeeeeeeeeeeeeeeeeeeeee A: ${actualCoord} E: ${endCoord}`);
        }
    }
    if(actualCoord <= endCoord) {
        actualCoord += 1;
        if(actualCoord >= endCoord){
            clearInterval(playerBlobBodyPointArray.moveBloBAutomaticaly);
            clearInterval(playerBlobBodyPointArray.updateCoordXInterval);
            clearInterval(playerBlobBodyPointArray.updateCoordYInterval);
            console.log(`koncze A: ${actualCoord} E: ${endCoord}`);
        }
    }
    return actualCoord;
}
updateCordX = (blob, actualCoord, endCoord, id) => {
    console.log(actualCoord, endCoord);
    coordX = moveBloBAutomaticalyInsideInterval(blob, actualCoord, endCoord, id);
    console.log('return ' + coordX);
    console.log('aktualnie' + playerBlobBodyPointArray[id].position.x);
    playerBlobBodyPointArray[id].position.x = coordX;
    console.log(' nadpisane ' + playerBlobBodyPointArray[id].position.x);  
}
updateCordY = (blob, actualCoord, endCoord) => {
    coordY = moveBloBAutomaticalyInsideInterval(blob, actualCoord, endCoord);
    // console.log(coordY);
    playerBlobBodyPointArray[id].position.y = coordY;
}
let updateCoordXInterval, updateCoordYInterval
