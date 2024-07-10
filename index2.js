const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const { URL } = require('url');
console.log('server start ...');
console.log(URL);
let winCount = 0;
http.createServer((req, res)=>{
    console.log('Get request...');
    // console.log(req.url, '>>>>>>>');
    let protocol = req.headers['x-forwarded-proto'] || 'http';
    let host = req.headers.host;
    const realUrl = `${protocol}://${host}${req.url}`;
    // console.log('realUrl:>>>>', realUrl);
    
    
    const url = new URL(realUrl);
    // console.log('pathname:>>', url.pathname)
    // let searchObj = null;
    // if(url.search) {
    //     searchObj = url.searchParams;
    // }

    if(req.url === '/') {
        res.writeHead(200);
        fs.createReadStream(`${__dirname}/index.html`).pipe(res);
    } else {
        
        switch(url.pathname) {
            case '/game':
                console.log();
                if(winCount > 5) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end(`I won't play`);
                    return;
                }
                res.writeHead(200);
                if(url.search !== '') {                    
                    const action = url.searchParams.get('action');
                    console.log(`The action is ${action}`);
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
                        case 'reset':
                            console.log('')
                    }
                }                
                break;
        }
        
        
    }
    
    
}).listen(3000);