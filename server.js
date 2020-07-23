const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = 3000;
const fs = require('fs')
app.use(express.static('public')); // adding 'public' folder to use
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extendet: true}))
  con.connect((error) => {
    if (error) console.log('FailedConnecttoDB');
    else console.log("Connected!");
    con.query('Select money from money where id_money = 1', (error, rows, fields) => {
        console.log(rows);
    })
  });
// route
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/HIT/Desktop/Agario/public/index.html'));
}

app.post('/', (req, res) => {
  fs.writeFileSync('./public/user_data.json', JSON.stringify(req.body))
  console.log('Saved data of user', req.body[0].login)
})

app.listen(port, () => {
    console.log(`listening at http:/localhost:${port}`);
})