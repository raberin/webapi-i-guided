// 1) First install express dependency 'yarn add express' on terminal

//2) Import express into files which is below
const express = require("express");

//What is good about express vs vanilla node
//express = lightweight
//routers -> organizing our endpoints
//middleware -> allows us an expand and customize

//Importing hubs from db.js
const db = require("./data/db.js");
const { hubs } = db;
//Same thing as above
// const hubs = db.hubs;

//Call express function
const server = express();

//middleware
server.use(express.json());

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
  //then send them back
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
  console.log("req body", req.body);
  hubs
    .add(newHub)
    .then(addedHub => {
      res.status(201).json(addedHub);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

//Destroy/Delete - remove a hub
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  hubs
    .remove(id)
    .then(removedHub => {
      if (removedHub) {
        res.json(removedHub);
      } else {
        res.status(404).json({ err: "incorrect id" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

//Update - update a hub
server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  hubs
    .update(id, changes)
    .then(updatedHub => {
      //If the hub is available, if not incorrect id
      if (updatedHub) {
        res.json(updatedHub);
      } else {
        res.status(404).json({ err: "incorrect id" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.get("/hubs/:id", (req, res) => {});

//listening
server.listen(9090, () => {
  console.log("Listening on port 9090");
});
