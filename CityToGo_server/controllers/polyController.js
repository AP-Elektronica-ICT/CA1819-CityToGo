const fetch = require('node-fetch');

exports.polyModels = function (req, res) {

    fetch('https://poly.googleapis.com/v1/assets?key=AIzaSyBKGwdkYKouLP8Tpk8gjniCuAcXbxrfSm0&format=OBJ&category=architecture&orderBy=BEST&category=art&category=nature')
        .then(data => data.json())
        .then((assets) => {

            res.send(assets)
        })


};