const { User, Tweet, Like } = require('../models')

const tweetServices = {
  likeTweet: async (tweetId, userId) => {
    const tweet = await Tweet.findByPk(tweetId)
    if (!tweet) throw new Error("This Tweet didn't exist!")

    const [isLiked, created] = await Like.findOrCreate({
      where: { TweetId: tweetId, UserId: userId }
    })

    if (!created) throw new Error("You have already like this tweet!")

    Promise.all([
      User.findByPk(userId),
      Tweet.findByPk(tweetId)
    ]).then(([user, tweet]) => {
      user.increment('likedCount')
      tweet.increment('likedCount')
    })

    return {
      isLiked,
      status: 'success',
      message: "Add Tweet's like successfully"
    }
  },

  unlikeTweet: async (tweetId, userId) => {
    const unlike = await Like.findOne({
      where: { TweetId: tweetId, UserId: userId }
    })
    if (!unlike) throw new Error("You haven't like this tweet!")

    await unlike.destroy()

    Promise.all([
      User.findByPk(userId),
      Tweet.findByPk(tweetId)
    ]).then(([user, tweet]) => {
      user.decrement('likedCount')
      tweet.decrement('likedCount')
    })

    return {
      unlike,
      status: 'success',
      message: "Remove Tweet's like successfully"
    }
  }
}

module.exports = tweetServices