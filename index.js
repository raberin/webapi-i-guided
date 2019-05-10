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

//Read - send back a list of all hubs
server.get("/hubs", (req, res) => {
  //get the hubs from the db
  hubs
    .find()
    .then(allHubs => {
      res.json(allHubs);
    })
    //fancy catch
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
  //regular catch
  //.catch(err => {
  //  res.status(500).json(err);
  // })
});

//Create - add a new hub to the list
server.post("/hubs", (req, res) => {
  const newHub = req.body;

  hubs
    .add(newHub)
    .then(addedHub => {
      res.status(201).json(addedHub);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

//listening
server.listen(9090, () => {
  console.log("Listening on port 9090");
});
