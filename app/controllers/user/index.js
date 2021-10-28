const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty",
    });
    return;
  } else if (!req.body.password) {
    res.status(400).send({
      message: "password can not be empty",
    });
    return;
  } else if (!req.body.fullname) {
    res.status(400).send({
      message: "fullname can not be empty",
    });
    return;
  } else if (!req.body.HP) {
    res.status(400).send({
      message: "HP can not be empty",
    });
    return;
  } else if (!req.body.address) {
    res.status(400).send({
      message: "address can not be empty",
    });
    return;
  } else if (!req.body.email) {
    res.status(400).send({
      message: "email can not be empty",
    });
    return;
  }

  const create = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    HP: req.body.HP,
    address: req.body.address,
    email: req.body.email,
  };

  user.create(create)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while create data",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  user.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find user",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  user.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive user with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  user.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "User was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  user.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "User was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};