const db = require("../../models");
const discount = db.discount;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty",
    });
    return;
  } else if (!req.body.description) {
    res.status(400).send({
      message: "description can not be empty",
    });
    return;
  } else if (!req.body.discount_percent) {
    res.status(400).send({
      message: "discount percent can not be empty",
    });
    return;
  }

  const create = {
    name: req.body.name,
    description: req.body.description,
    discount_percent: req.body.discount_percent,
    status: req.body.status ? req.body.status : false,
  };

  discount.create(create)
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

  discount.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find discount",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  discount.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive crud with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  discount.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Discount was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update discount with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating discount with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  discount.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "discount was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete discount with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete discount with id=" + id,
      });
    });
};

exports.findAllStatusAktif = (req, res) => {
    discount.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find discount",
      });
    });
};
