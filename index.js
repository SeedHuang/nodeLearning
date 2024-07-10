const express = require('express');
const fs = require('fs');
// const { URL } = require('url');
// console.log('server start ...');
const app = express();
app.listen(3000);

app.get('/favicon.ico', (req, res)=>{
    res.status(200);
    return;
});
let winCount = 0;

app.get('/reset', (req, res) => {
    winCount = 0;
    console.log('winCount has been reset');
    res.send('winCount has been reset');
});

app.get('/game', 
    (req, res, next) => {
        const action = req.query.action || '';
        console.log(`Action is ${action}`);
        if(winCount > 5) {
            // res.writeHead(500, {'Content-Type': 'text/plain'});
            // res.end(`I won't play`);
            res.status(500);
            res.send(`I won't play`);
            return;
        }
        // res.status(200); //一般情况下不写res.status，默认就是200
        res.action = action;
        next();
    }, 
    function(req, res){
        console.log('In next');
        const action = res.action;
        console.log('action is ', action);
        if(action !== '') {
            switch(action) {
                case 'jiandao':
                    console.log('成功');
                    winCount++;
                    res.send('成功');
                    break;
                case 'shitou':
                    console.log('失败');
                    winCount++;
                    res.send('失败');
                    break;
                case 'bu':
                    console.log('平局');
                    winCount++;
                    res.send('平局');
                    break;
            }
        } else {
            console.log('You have no action');
            res.end();
        }
    }
);

app.get('/', (req, res)=>{
    res.send(fs.readFileSync(`${__dirname}/index.html`, 'utf-8'));
    // fs.createReadStream(`${__dirname}/index.html`).pipe(res);
});