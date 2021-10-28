const db = require("../../models");
const payment = db.payment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const create = {
    order_id: req.body.order_id,
    amount: req.body.amount,
    provider: req.body.provider,
    status: req.body.status ? req.body.status : false,
  };

  payment.create(create)
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
  const order_id = req.query.order_id;
  let condition = order_id ? { name: { [Op.equal]: `%${order_id}%` } } : null;

  payment.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find payment",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  payment.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive payment with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  payment.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Payment was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update payment with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating payment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  payment.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Payment was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete payment with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete payment with id=" + id,
      });
    });
};