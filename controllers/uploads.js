const path = require('path');
const fs = require('fs');
const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/users');
const Hospitals = require('../models/hospitals');
const Doctors = require('../models/doctors');
const { updateImage } = require('../helpers/update-image');

const fileUpload = async (req, res = response) => {
  try {
    const type = req.params.type;
    const id = req.params.id;

    // Validate type
    const arrayTypes = ['users', 'hospitals', 'doctors'];
    if(!arrayTypes.includes(type)) {
      return res.status(400).json({
        ok: false,
        msg: "Type not correct"
      });
    }

    // Validate file
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No files were uploaded."
      });
    }

    // Process image
    const file = req.files.img
    const splitName = file.name.split('.') // e.g. wolverine . jpg
    const extensionFile = splitName[splitName.length -1];

    // validate file
    const arrayExtensions = ['png','jpg', 'jpeg', 'gif'];
    if(!arrayExtensions.includes(extensionFile)) {
      return res.status(400).json({
        ok: false,
        msg: "Extension not allowed"
      });
    }

    //Generate name
    const nameFile = `${uuidv4()}.${extensionFile}`;

    // Path for save file
    const path = `./uploads/${type}/${nameFile}`;

    // Move img
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          ok: false,
          msg: "Image move error"
        });
      }

      // Update BD
      updateImage(type, id, nameFile);

      res.json({
        ok:true,
        msg: "File Upload",
        nameFile
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const returnImg = async (req, res = response) => {
  try {
    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

    if(fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
    } else {
      const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathImg);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};



module.exports = {
  fileUpload,
  returnImg
}