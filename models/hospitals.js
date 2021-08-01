const { Schema, model } = require('mongoose');

const HospitalsScheme = Schema({
  name: {
    type: String,
    require: true
  },
  img: {
    type: String,
  },
  user: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});

HospitalsScheme.method('toJSON', function() {
  const {__v, ...object} = this.toObject();

  return object;
});

module.exports = model('Hospitals', HospitalsScheme);