const db = require("../../models");
const product = db.product;
const Op = db.Sequelize.Op;

exports.sendToOrder = () => {

}

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
  } else if (!req.body.price) {
    res.status(400).send({
      message: "Price can not be empty",
    });
    return;
  } else if (!req.body.stock) {
    res.status(400).send({
      message: "Stock can not be empty",
    });
    return;
  }

  const create = {
    category_id: req.body.category_id,
    discount_id: req.body.discount_id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock
  };

  product.create(create)
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

  product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find product",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive product with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  product.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  product.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
      });
    });
};