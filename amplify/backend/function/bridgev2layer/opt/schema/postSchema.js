const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    sub: String,
    caption: String,
    comments: Number,
    datetimePublished: Date,
    datetimeScheduled: Date,
    id: Number,
    key: String,
    media: [String],
    mediaLayout: String,
    orientation: String,
    postKey: String,
    publisher: String,
    publisherPicture: String,
    reacted: [
      {
        sub: String,
        name: String,
        picture: String,
        reaction: String,
        reactedAt: {type: Date, default: Date.now},
      }
    ],
    reactionList: [String],
    reactions: {
      star: Number,
      love: Number,
      birthday: Number,
      happy: Number,
    },
    status: String,
    taggedPeople: [
      {
        sub: String,
        name: String,
        picture: String,
      },
    ],
    team: String,
    title: String,
    type: String,
  });
  
 module.exports = mongoose.model("post", postSchema);
  