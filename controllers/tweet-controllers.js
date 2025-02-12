const helper = require('../_helpers')
const tweetServices = require('../services/tweet-service')

const tweetController = {
  // Get all tweet data include user data and latest shows at front, return in an Array
  getTweets: async (req, res, next) => {
    try {
      const tweets = await tweetServices.getTweets(req)

      return res.status(200).json(tweets)
    } catch (error) {
      next(error)
    }
  },

  // Create a new tweet
  postTweet: async (req, res, next) => {
    const user = helper.getUser(req)
    const { description } = req.body
    try {
      const tweet = await tweetServices.postTweet(user, description)

      return res.status(200).json(tweet)
    } catch (error) {
      next(error)
    }
  },

  // Get specific tweet include user and replies data
  getTweet: async (req, res, next) => {
    const tweetId = req.params.tweet_id
    try {
      const tweet = await tweetServices.getTweet(tweetId, req)

      return res.status(200).json(tweet)
    } catch (error) {
      next(error)
    }
  },

  likeTweet: async (req, res, next) => {
    const tweetId = req.params.id
    const userId = req.user.id

    try {
      const like = await tweetServices.likeTweet(tweetId, userId)

      return res.status(200).json(like)
    } catch (err) {
      next(err)
    }
  },

  unlikeTweet: async (req, res, next) => {
    const tweetId = req.params.id
    const userId = req.user.id

    try {
      const unlike = await tweetServices.unlikeTweet(tweetId, userId)

      return res.status(200).json(unlike)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = tweetController
