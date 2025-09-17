const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const plain = user.toJSON();
    delete plain.password;
    res.status(201).json(plain);
  } catch (err) {
    next(err);
  }
};
