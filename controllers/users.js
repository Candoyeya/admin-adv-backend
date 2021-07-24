const {response} = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const {generateJWT} = require('../helpers/jwt');

const getUsers = async (req, res = response) => {
  try {
    const users = await Users.find({}, 'name email role google');

    res.json({
      ok:true,
      users,
      uid: req.uid
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const createUser = async (req, res = response) => {
  const {email,password} = req.body

  try {
    const checkEmail = await Users.findOne({email});
    if(checkEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email exist"
      });
    }
    const user = new Users(req.body);

    // Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok:true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id

  try {
    const user = await Users.findById(uid);
    if(!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found"
      })
    }

    // TODO: Validate Token and user correct

    
    // Update user
    // Check fields
    const {password, google, email, ...fields} = req.body;
    if(user.email !== email) {
      const checkEmail = await Users.findOne({email});
      if(checkEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Email exist"
        })
      }
    }

    fields.email = email;

    const userUpdated = await Users.findByIdAndUpdate(uid, fields, {new: true});

    res.json({
      ok:true,
      userUpdated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    })
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id

  try {
    const user = await Users.findById(uid);
    if(!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found"
      })
    }

    await Users.findByIdAndDelete(uid);

    res.json({
      ok:true,
      msg: "User deleted successfully"
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
  getUsers,
  createUser,
  updateUser,
  deleteUser
}