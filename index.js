// 1) First install express dependency 'yarn add express' on terminal

//2) Import express into files which is below
const express = require("express");

//What is good about express vs vanilla node
//express = lightweight
//routers -> organizing our endpoints
//middleware -> allows us an expand and customize

//Call express function
const server = express();

//creating endpoints
//.get - I want to make something available in case anyone needs it (Backwards compared to frontend .get)
server.get("/", (req, res) => {
  console.log("inside the get request");
  //Specify data type
  //Set a status code
  //Send a response
  res.send("<h2>Hello World</h2>");
});

//request handler for /now that sends back the current date in string form
server.get("/now", (req, res) => {
  res.send(`${Date.now()}`);
});

//listening
server.listen(9090, () => {
  console.log("Listening on port 9090");
});
