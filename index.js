//import express from 'express';// ES6 modules

const express = require('express');// CommonJS module, equivalent to above
const shortid = require('shortid'); // npm install shortid
const server = express();// create a server

server.use(express.json()); // teaches express how to read JSON form req.body

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      },
      {
        id:shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
];



server.get("/", (req, res) => {
    res.status(200).send('<h1>Hello Web 17</h1>')
});

server.get('/api/users', (req, res) => {
    res.status(200).json(hubs);
})

server.post('/api/users', (req, res) => {
    const newUsers = req.body; //needs express.json() middleware

    newUsers.id = shortid.generate();

    users.push(newUsers);
    res.status(201).json(newUsers);
});

server.delete('/api/users/:id', (req, res) => {//the id name has to match on line 42
    const id = req.params.id;
    const deleted = users.find(h => h.id === id);
    users = users.filter(h => h.id !== id);

    res.status(200).json(deleted);
})
server.delete('/api/users/:id', (req, res) => {//the id name has to match on line 42
    const id = req.params.id;
    const changes = req.body; 

    let found= users.find(h => h.id === id);

    if(found) {
        //found a user
      Object.assign(found, changes);
      res.status(200).json(found);
    
    }else {
        //did not find a user with that id 
        res.status(404).json({message:"User not found"})
    }

    res.json(found);
})

const PORT = 8000;// We visit http://localhost:8000/ to see the api
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

console.log('server running...');