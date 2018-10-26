const express = require('express')
const app = express()
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://citytogo.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/',
    issuer: "https://citytogo.eu.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/', (req, res) => {
    res.send('Hello World!') 
})





app.listen(port, () => console.log(`Listening on port ${port}!`))