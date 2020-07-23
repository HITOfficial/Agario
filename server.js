const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const fs = require('fs')
app.use(express.static('public')); // adding 'public' folder to use
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extendet: true}))
// route
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/HIT/Desktop/Agario/public/index.html'));
})
app.listen(port, () => {
    console.log(`listening at http:/localhost:${port}`);
})
console.log('connencted')