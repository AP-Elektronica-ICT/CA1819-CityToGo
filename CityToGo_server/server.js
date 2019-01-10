const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const bodyparser = require('body-parser');
var secret = require('./config/secret')
var port = process.env.PORT || 3000;

app.use(bodyparser.json({ limit: '10mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))

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





