const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const bodyparser = require('body-parser');
var secret = require('./config/secret')
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(bodyparser.json({ limit: '10mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))

let mongoDB = `mongodb://Admin:${secret.mongoDBpass}@citytogocluster-shard-00-00-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-01-93g0j.gcp.mongodb.net:27017,citytogocluster-shard-00-02-93g0j.gcp.mongodb.net:27017/test?ssl=true&replicaSet=CitytogoCluster-shard-0&authSource=admin&retryWrites=true`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://shakir01.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/',
    issuer: "https://shakir01.eu.auth0.com/",
    algorithms: ['RS256']
});


app.use('/', require('./routes'));


app.listen(port, () => {});





