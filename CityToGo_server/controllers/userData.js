var UserSession = require('../models/userSession');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.session_create = function (req, res) {
    console.log(req.body.subSession)
    var userSession = new UserSession(
        {
            userId: req.body.userId,
            isRunning: req.body.isRunning,
            subSession: {
                startTime: req.body.subSession.startTime,
                stopTime: req.body.subSession.stopTime,
                monument: req.body.subSession.monument
            }
        });

    userSession.save(function (err) {
        if (err) {
            res.send(err)
            //return next(err);
        } else
            res.send('user session created successfully')
    })
};


