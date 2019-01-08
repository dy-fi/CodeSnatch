const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('../data/CodeSnatch-db');

const SnipSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: String,
    createdAt: { type: Date },
    updatedAt: { type: Date },
    // author : { type: Schema.Types.ObjectId, ref: "User", required: true },
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

module.exports = ('Snip', SnipSchema);
