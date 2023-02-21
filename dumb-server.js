const https = require('https');
const fs = require('fs');


const httpsServer = https.createServer({
    key:fs.readFileSync('./key.pem'),
    cert:fs.readFileSync('./cert.pem')
},(req,res)=>{
    res.end('ello')
});

httpsServer.listen(9000,()=>{
    console.log('http running on https://localhost:'+httpsServer.address().port)
})

