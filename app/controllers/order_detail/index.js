const db = require("../../models");
const order_detail = db.order_detail;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const create = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };

  order_detail.create(create)
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

  order_detail.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find order detail",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  order_detail.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive order detail with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  order_detail.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Order detail was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update order detail with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating order detail with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  order_detail.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Order detail was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete order detail with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete order detail with id=" + id,
      });
    });
};