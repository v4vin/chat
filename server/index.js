'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile('./dist/', { root: __dirname });
});

app.use(express.static(__dirname));

http.listen(4100, () => {
    console.log('App is listening on http://localhost:4100/');
});

app.get('/api', (req, res, next) => {
    req.body = {query: '{ messages }'};
    const graphqlHTTPHandler = graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    });
    graphqlHTTPHandler(req, res).then(() => {
        next();
    }).catch((e) => {
        next(e);
    });
});
app.post('/api', (req, res, next) => {
    const graphqlHTTPHandler = graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    });
    graphqlHTTPHandler(req, res).then(() => {
        next();
        io.emit('message');
    }).catch((e) => {
        next(e);
        console.log('catch');
    });
});

