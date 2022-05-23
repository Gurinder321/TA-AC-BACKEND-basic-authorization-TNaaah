let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let podcastSchema = new Schema(
  {
    title: String,
    description: String,
    isFree: { type: Boolean, default: false },
    isVIP: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

var Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
