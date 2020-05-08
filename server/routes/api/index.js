const router = require('express').Router();
const userRoutes = require('./user-routes');
const {Emotion} = require('../../models');

router.use('/users', userRoutes);

router.get('/emotions', (req, res) => {
  console.log("heosjfsjdfiosfj");
  Emotion.find()
  .then(emotionData => {
    console.log(emotionData);
    res.json(emotionData)
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
}),


router.post("")

module.exports = router;