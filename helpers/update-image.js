const fs = require('fs');

const Users = require('../models/users');
const Hospitals = require('../models/hospitals');
const Doctors = require('../models/doctors');


const deleteImg = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

const updateImage = async (type, id, nameFile) => {
  let oldPath = '';
  switch(type) {
    case "users":
      const user = await Users.findById(id);
      if(!user) {
        console.log('The id provided is not a user');
        return false;
      }

      // delete old img
      oldPath = `./uploads/${type}/${user.img}`;
      deleteImg(oldPath);

      // Save new img
      user.img = nameFile;
      await user.save();
      return true;

      break;
    case "hospitals":
      const hospital = await Hospitals.findById(id);
      if(!hospital) {
        console.log('The id provided is not a hospital');
        return false;
      }

      // delete old img
      oldPath = `./uploads/${type}/${hospital.img}`;
      deleteImg(oldPath);

      // Save new img
      hospital.img = nameFile;
      await hospital.save();
      return true;

      break;
    case "doctors":
      const doctor = await Doctors.findById(id);
      if(!doctor) {
        console.log('The id provided is not a doctor');
        return false;
      }

      // delete old img
      oldPath = `./uploads/${type}/${doctor.img}`;
      deleteImg(oldPath);

      // Save new img
      doctor.img = nameFile;
      await doctor.save();
      return true;

      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "The collection must be users/hospitals/doctors"
      });
  }
}

module.exports = {
  updateImage
}