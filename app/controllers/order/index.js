const db = require("../../models");
const order = db.order;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const create = {
    user_id: req.body.user_id,
    total: req.body.total
  };

  order.create(create)
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
  const user_id = req.query.user_id;
  let condition = user_id ? { name: { [Op.equal]: `%${user_id}%` } } : null;

  order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find order",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  order.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive order with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  order.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Order was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating order with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  order.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "order was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete order with id=" + id,
      });
    });
};