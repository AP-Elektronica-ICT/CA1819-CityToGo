const fetch = require('node-fetch');

exports.quizCategory = function(req,res){

    fetch('https://opentdb.com/api.php?amount='+ req.body.number +'&category=' + req.body.category + '&type=boolean')
        .then(data => data.json())
        .then((Quizes) => {
            console.log(req.body.category)
            
            res.send(Quizes.results)
        })


};