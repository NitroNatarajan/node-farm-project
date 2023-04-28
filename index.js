
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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
}
const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");


const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      'content-type': 'text/html',
    })
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace('{%PRODUCTCARD%}', cardsHtml);
    res.end(output);
  }
  // product page
  else if (pathname === "/product") {
    res.writeHead(200, {
      'content-type': 'text/html',
    })
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct,product)
    res.end(output);
  }
  // api
  else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    })
    res.end(data);
  }
  // not found
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'HELLO-WORLD'
    })
    res.end('Page Not Found!!')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to the requests on port 8000");
});