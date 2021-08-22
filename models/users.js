const { Schema, model } = require('mongoose');

const UsersScheme = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  },
});

UsersScheme.method('toJSON', function() {
  const {__v, _id, password, ...object} = this.toObject();

  object.uid = _id;
  return object;
});

module.exports = model('Users', UsersScheme);