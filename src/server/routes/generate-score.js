const express = require('express');
const app = express()
const router = express.Router();
const scoreController = require('../controllers/generate-score');
const auth = require('../middlewares/auth');

router.post('/score/generate', auth.authorize, scoreController.getScoreAndActionItems);

router.get('/score/actionItems', auth.authorize, scoreController.getActionItems);

router.post('/score/actionItemsByUserId', auth.authorize, scoreController.getActionItemsByUserId);

router.post('/score/getScoreByUserId', auth.authorize, scoreController.getScoreByUserId);


module.exports = router;