const express = require('express'),
    server = express();

server.set('port', process.env.PORT || 3001);

//Basic routes
server.get('/', (request, response) => {
    response.send('Home Page');
});

server.get('/about', (request, response) => {
    response.send('About Page')
});

//Express error handling middleware
server.use((request, response) => {
    response.type('text/plain');
    response.status(505);
    response.send('Error Page')
});

//Binding to a port
server.listen(3001, () => {
    console.log('Express server started at port 3001');
    console.log("Running in environment: "  + process.env.NODE_ENV);
});