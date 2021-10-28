const db = require("../../models");
const product_category = db.product_category;
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
  }

  const create = {
    name: req.body.name,
    description: req.body.description
  };

  product_category
    .create(create)
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

  product_category.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find product category",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  product_category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive product category with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  product_category.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product category was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update discount with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product category with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  product_category.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product category was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete product category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product category with id=" + id,
      });
    });
};
