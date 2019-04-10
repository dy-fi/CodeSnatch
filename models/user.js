const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-find-or-create');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, select: false },
  username: { type: String, required: true,  minlength: 3, unique: true },
  snips: [{ type: Schema.Types.ObjectId, ref: 'Snip'}],
  githubId: { type: String, select: false },
});

UserSchema.plugin(findOrCreate)

UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
