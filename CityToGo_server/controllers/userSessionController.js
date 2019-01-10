var UserSession = require('../models/userSessionModel');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.session_create = function (req, res) {
    var userSession = new UserSession(
        {
            userId: req.body.userId,
            isRunning: req.body.isRunning,
            subSession: {
                startTime: req.body.subSession.startTime,
                stopTime: req.body.subSession.stopTime,
                isFound: req.body.subSession.stopTime,
                monument: req.body.subSession.monument
            }
        });

    userSession.save(function (err) {
        if (err) return res.send(err)

        console.log("session is created!")
        return res.status(200).json(userSession)
    })
};

exports.session_getAll = function (req, res) {
    UserSession.find({}, function (err, docs) {
        var userSessionMap = {};

        if (!docs) return res.status(404).end()

        docs.forEach(function (doc) {
            userSessionMap[doc._id] = doc;
        });

        return res.status(200).json(userSessionMap)

    }).catch(err =>console.log(err))
}

exports.session_find = function (req, res) {
    let _userId = req.params.userId;
    UserSession.find({ userId: _userId }, function (err, doc) {
        if (!doc) return res.status(404).end()
        return res.status(200).json(doc)
    })
        .catch(err => console.log(err))
}

exports.session_update = function (req, res) {
    var conditions = { _id: req.params.id };

    UserSession.updateOne(conditions, req.body)
        .then(doc => {
            if (!doc) return res.status(404).end()
            return res.status(200).json(doc)
        })
        .catch(err => console.log(err))

}