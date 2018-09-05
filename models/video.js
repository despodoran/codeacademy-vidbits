const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'title is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    videoUrl: {
      type: String,
      required: [true, 'URL is required']
    }
  })
);

module.exports = Video;
