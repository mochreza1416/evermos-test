const db = require("../../models");

const checkProduct = async (req) => {
  const query = `SELECT * FROM products WHERE id = ${req.product_id}`;
  const data = await db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return Promise.all(data);
};

const reqData = async (req) => {
  let totalPrice = 0;
  let product = await Promise.all(
    req.map(async (m) => {
      const data = await checkProduct(m);
      totalPrice += parseFloat(data[0].price) * m.quantity;
      if (data[0].stock > m.quantity) {
        return {
          validation: true,
          description: `Stock available for product ${
            data[0].name
          } remaining stock ${data[0].stock - m.quantity}`,
        };
      } else {
        return {
          validation: false,
          description: `Stock not available for product ${data[0].name}  remaining stock ${data[0].stock}`,
        };
      }
    })
  );
  product.totalPrice = parseFloat(totalPrice);
  return product;
};

const insertOrder = async (createOrder) => {
  const order = await db.order
    .create(createOrder)
    .then((data) => {
      return data.dataValues;
    })
    .catch((err) => {
      return err.message;
    });
  return order;
};

const insertOrderDetail = async (createOrderDetail) => {
  await db.order_detail
    .create(createOrderDetail)
    .then((data) => {
      return data.dataValues;
    })
    .catch((err) => {
      return err.message;
    });
};

const updateProduct = async (id, data) => {
  await db.product
    .update(data, {
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
      return err.message;
    });
};

exports.postOrder = async (req, res) => {
  const Data = req.body;
  try {
    const product = await reqData(Data);
    const cekValidation = product.filter((f) => f.validation === false);
    if (cekValidation === undefined || cekValidation.length === 0) {
      const createOrder = {
        user_id: req.body[0].user_id,
        total: product.totalPrice,
      };
      const order = await insertOrder(createOrder);

      Data.map(async (m) => {
        const createOrderDetail = {
          order_id: order.id,
          product_id: m.product_id,
          quantity: m.quantity,
        };

        const data = await checkProduct(m);
        const createProduct = {
          stock: data[0].stock - m.quantity,
        };

        await insertOrderDetail(createOrderDetail);
        await updateProduct(m.product_id, createProduct);
      });

      return res.send({ message: "Post order successfully" });
    } else {
      return res.send({
        message: "Post order failed because stock not available",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while find products",
    });
  }
};
