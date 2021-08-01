const {response} = require('express');

const Hospitals = require('../models/hospitals');
const {generateJWT} = require('../helpers/jwt');


const getHospitals = async (req, res = response) => {
  try {
    const hospitals = await Hospitals.find().populate('user', 'name img');

    res.json({
      ok:true,
      hospitals
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const createHospital = async (req, res = response) => {
  try {
    const uid = req.uid;
    const hospital = new Hospitals({
      ...req.body,
      user: uid
    });

    // Save hospital
    const newHospital = await hospital.save();

    res.json({
      ok:true,
      hospital: newHospital
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const updateHospital = async (req, res = response) => {
  const uid = req.params.id

  try {
    res.json({
      ok:true,
      msg: "updateHospital"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    })
  }
};

const deleteHospital = async (req, res = response) => {

  try {
    res.json({
      ok:true,
      msg: "Hospital deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    })
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}