const {response} = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const {generateJWT} = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const {email, password} = req.body;
  try {
    // Check email
    const user = await Users.findOne({email});
    if(!user) {
      return res.status(404).json({
        ok: false,
        msg: "Wrong email or password"
      })
    }

    // Check password
    const checkPass = bcrypt.compareSync(password, user.password);
    if(!checkPass) {
      return res.status(404).json({
        ok: false,
        msg: "Wrong email or password"
      })
    }

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

const googleSignin = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    // Check email
    const {name, email, picture} = await googleVerify(googleToken);
    let user;
    const userDB = await Users.findOne({email});
    if(!userDB) {
      user = new Users({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true
      });
    } else {
      // User Exist
      user = userDB;
      user.google = true;
    }

    // Update user
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

module.exports = {
  login,
  googleSignin
}