const {response} = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const {generateJWT} = require('../helpers/jwt');

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

module.exports = {
  login
}