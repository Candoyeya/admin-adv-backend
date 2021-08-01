const { Schema, model } = require('mongoose');

const DoctorsScheme = Schema({
  name: {
    type: String,
    require: true
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospitals',
    require: true
  }
});

DoctorsScheme.method('toJSON', function() {
  const {__v, ...object} = this.toObject();

  return object;
});

module.exports = model('Doctors', DoctorsScheme);