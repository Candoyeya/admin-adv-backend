const {response} = require('express');
const Users = require('../models/users');
const Hospitals = require('../models/hospitals');
const Doctors = require('../models/doctors');

const getAll = async (req, res = response) => {
  try {
    const value = req.params.value;
    const regex = new RegExp(value, 'i');

    const [ users, hospitals, doctors ] = await Promise.all([
      Users.find({ name: regex }),
      Hospitals.find({ name: regex }),
      Doctors.find({ name: regex })
    ]);

    res.json({
      ok:true,
      users,
      hospitals,
      doctors
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const getAllDocument = async (req, res = response) => {
  try {
    // Get Params
    const table = req.params.table;
    const value = req.params.value;
    const regex = new RegExp(value, 'i');

    let results = [];
    // Check collection
    switch(table) {
      case "users":
        results = await Users.find({ name: regex });
        break;
      case "hospitals":
        results = await Hospitals.find({ name: regex }).populate('user', 'name img');
        break;
      case "doctors":
        results = await Doctors.find({ name: regex }).populate('user', 'name img')
                                                  .populate('hospital', 'name img');
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: "The collection must be users/hospitals/doctors"
        });
    }

    // return data
    res.json({
      ok:true,
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

module.exports = {
  getAll,
  getAllDocument
}