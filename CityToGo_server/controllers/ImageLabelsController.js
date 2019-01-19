var image = require('./NextCheckpointController')

var resultCameraImgLabels;




exports.getImageLabels = function (req, res) {

    var imgBase64 = req.body.image
    let resultMatch = 0

    image.getVisionImgLabels(imgBase64)
        .then(res => res.json())
        .then(json => {
            resultCameraImgLabels = json.responses[0].webDetection.webEntities
            console.log(image.i)
            console.log(image.resultBingImgLabels)
            image.resultBingImgLabels.forEach((e1) => resultCameraImgLabels.forEach((e2) => {
                console.log('resultBingImgLabels ' + e1.description)
                console.log('resultCameraImgLabels ' + e2.description)
                if (e1.description == e2.description)
                    resultMatch += 1
            }))

            console.log(resultMatch)

            if (resultMatch >= 2)
                res.send(JSON.stringify('match'))
            else
                res.send(JSON.stringify('no match'))
        })
        .catch(err => console.error(err));


}