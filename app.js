const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.setHeader('Content-Type','text/html');
        res.end(
            `<form action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type='submit'>add</button>
            </form>`
        )
    }else{
        if(req.url==='/message'){
            res.setHeader('Content-Type','text/html');
            let dataChunks=[];
            req.on('data',(chunks)=>{
                console.log(chunks);
                dataChunks.push(chunks);
            }) 
            req.on('end',()=>{
                let combinedBuffer=Buffer.concat(dataChunks);
                console.log(combinedBuffer);
                console.log(combinedBuffer.toString());
                let value=combinedBuffer.toString().split("=")[1];
                console.log(value);
                fs.writeFile('formValues.txt',value,(err)=>{
                    res.statusCode=302;
                    res.setHeader('location','/');
                    res.end();
                })

            })
        }else{
            if(req.url=='/read'){
                fs.readFile('formValues.txt',(err,data)=>{
                    console.log(data.toString());
                    res.end(`<h1>${data.toString()}</h1>`);
                })
            }
        }
    }
})
server.listen(3000,()=>{
    console.log('server is listening on port 3000');
})