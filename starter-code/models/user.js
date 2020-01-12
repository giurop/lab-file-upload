const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Picture',
  },
}, {
  createdAt: "createdAt", updatedAt: "updatedAt"
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
