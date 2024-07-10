const express = require('express');
const fs = require('fs');
// const { URL } = require('url');
// console.log('server start ...');
const app = express();
app.listen(3000);

app.get('/favicon.ico', (req, res)=>{
    res.writeHead(200);
    res.end();
    return;
});
let winCount = 0;

app.get('/reset', (req, res) => {
    winCount = 0;
    console.log('winCount has been reset');
    res.end('winCount has been reset');
});

app.get('/game', (req, res) => {
    const action = req.query.action || '';
    console.log(`Action is ${action}`);
    if(winCount > 5) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(`I won't play`);
        return;
    }
    res.writeHead(200);
    if(action !== '') {
        switch(action) {
            case 'jiandao':
                console.log('成功');
                winCount++;
                res.end('成功');
                break;
            case 'shitou':
                console.log('失败');
                winCount++;
                res.end('失败');
                break;
            case 'bu':
                console.log('平局');
                winCount++;
                res.end('平局');
                break;
        }
    } else {
        console.log('You have no action');
        res.end();
    }
});

app.get('/', (req, res)=>{
    res.writeHead(200);
    fs.createReadStream(`${__dirname}/index.html`).pipe(res);
});