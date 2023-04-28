
////////////////////Files system
// Blocking, synchronous way
// const fs = require("fs");
// const content = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(content);

// const textOut = `This is all we know about avocado : ${content} \n Created on ${Date.now()}`;
// fs.writeFileSync(`./txt/${Date.now()}`, textOut);
// console.log(`File written with the date ${Date.now()}`);

// console.log("File readed lastly");


// Non Blocking and Asynchronous way
// const fs = require("fs");
// fs.readFile('./txt/start.txt', "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile('./txt/append.txt', "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2} \n ${data3}`, "utf-8", err => {
//         console.log(err);
//       })
//     });
//   });
// });
// console.log("File reading"); 


//////////////////////////////////

// server 


/*
const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName==="/" || pathName === "/overview") {
    res.end("I am an Overview");
  }
  else if (pathName === "/product") {
    res.end("I am an Product");
  }
  else if (pathName==="/api"){
       res.writeHead(200,{
        "content-type":"application/json",
       })
       res.end(data);
  }
  else {
    res.writeHead(404,{
      'content-type':'text/html',
      'my-own-header':'HELLO-WORLD'
    })
    res.end('Page Not Found!!')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to the requests on port 8000");
});

*/