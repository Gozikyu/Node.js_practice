const http =require('http')
const fs =require('fs')

var server=http.createServer(getFromClient)
server.listen(3000)
console.log('Server Start')

function getFromClient(req,res){
    fs.readFile('./index.html', 'UTF-8', (error,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end()
    })
}