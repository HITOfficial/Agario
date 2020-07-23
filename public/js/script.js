const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let playerBlob = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 20
};
let mouseCoord = {
    x : null,
    y : null,
}
blobs = [];
const createBlob = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
createBlob(playerBlob.x, playerBlob.y, playerBlob.radius);
canvas.addEventListener('mousemove', (mouse) => {
    mouseCoord.x = mouse.screenX;
    mouseCoord.y = mouse.screenY;
});