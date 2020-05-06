const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  savedEntries,
  deleteEntries,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, savedEntries);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/journals/:id').delete(authMiddleware, deleteEntries);

module.exports = router;