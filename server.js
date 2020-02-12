// imports
const express = require('express');
// data
const Users = require('./users/userDb.js');
const Posts = require('./posts/postDb.js');
// introduce routes
const userRouter = require('./users/userRouter.js')
// create server 
const server = express();
// global middleware
server.use(express.json())
server.use(logger)
// implement routes
server.use('/users', logger, userRouter)
// endpoints
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// - Write the function
// - Install in the global middleware section or on the route it belongs

// (1) - logger middleware 
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] via ${req.method}(method) to ${req.url}`)
  next();
}

// export 
module.exports = server;
