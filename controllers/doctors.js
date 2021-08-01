const {response} = require('express');

const Doctors = require('../models/doctors');
const {generateJWT} = require('../helpers/jwt');


const getDoctors = async (req, res = response) => {
  try {
    const doctors = await Doctors.find().populate('user', 'name img')
                                        .populate('hospital', 'name img');

    res.json({
      ok:true,
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

const createDoctor = async (req, res = response) => {
  try {
    const uid = req.uid;
    const doctor = new Doctors({
      ...req.body,
      user: uid
    });

    // Save hospital
    const newDoctor = await doctor.save();

    res.json({
      ok:true,
      doctor: newDoctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const updateDoctor = async (req, res = response) => {
  const uid = req.params.id

  try {
    res.json({
      ok:true,
      msg: "updateDoctor"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    })
  }
};

const deleteDoctor = async (req, res = response) => {

  try {
    res.json({
      ok:true,
      msg: "Doctor deleted successfully"
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
}