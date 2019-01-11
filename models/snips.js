const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('../data/CodeSnatch-db');

const SnipSchema = new Schema({
    title: String,
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    evaluation: {type: String, required: true},
    description: String,
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

SnipSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
      this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('Snip', SnipSchema);
