express = require('express');
var router = express.Router();

var userSession_controller = require('../controllers/userSessionController');
var NextCheckpoint_controller = require('../controllers/NextCheckpointController')
var ImageLabels_controller = require('../controllers/ImageLabelsController')
var quiz_controller = require('../controllers/quizController')
var polyModelsController = require('../controllers/polyController')

/*
 * Routes that can be accessed by anyone (temporally)
 */
router.get('/api/v1/userData/test', userSession_controller.test);
router.get('/api/v1/userSession/getall', userSession_controller.session_getAll)
router.get('/api/v1/userSession/find/:userId', userSession_controller.session_find)
router.post('/api/v1/userSession/create', userSession_controller.session_create);
router.put('/api/v1/userSession/update/:id', userSession_controller.session_update)
//router.get('/api/monumenten',userSession_controller.getAllMonuments)
router.post('/api/getNextLocation',NextCheckpoint_controller.getNextLocation)
router.post('/api/getImageLabels',ImageLabels_controller.getImageLabels)
router.post('/api/quizCategory',quiz_controller.quizCategory)
router.get('/api/v1/poly', polyModelsController.polyModels)

module.exports = router;
//.