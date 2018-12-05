var UserData = require('../models/userData');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    var userData = new UserData(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    userData.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('user data Created successfully')
    })
};


