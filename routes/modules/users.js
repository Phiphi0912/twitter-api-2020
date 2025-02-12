const express = require('express')
const router = express.Router()
const upload = require('../../helpers/multer')

const userController = require('../../controllers/user-controllers')

router.get('/get-current-user', userController.getCurrentUser)
router.get('/top', userController.getTopUsers)
router.get('/:id', userController.getUser)
router.put(
  '/:id',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]),
  userController.putUser
)
router.get('/:id/tweets', userController.getUserTweets)
router.get('/:id/replied_tweets', userController.getUserRepliedTweet)
router.get('/:id/likes', userController.getUserLikes)
router.get('/:id/followings', userController.getUserFollowings)
router.get('/:id/followers', userController.getUserFollowers)
router.get('/:id/notifications', userController.getNotifications)

module.exports = router
