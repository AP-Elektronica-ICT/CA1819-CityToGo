var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSessionSchema = new Schema({
    startTime: { type: Number, required: true },
    stopTime: { type: Number, required: true },
    isFound: { type: Boolean, required: true },
    monument: { type: JSON, required: true }
});

var userSessionSchema = new Schema({
    userId: { type: String, required: true },
    isRunning: { type: Boolean, required: true },
    subSession: [subSessionSchema]
})

// Export the model
module.exports = mongoose.model('userSession', userSessionSchema);