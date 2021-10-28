module.exports = (sequelize, Sequelize) => {
    const order_detail = sequelize.define("order_detail", {
      order_id: {
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      }
    });
    return order_detail;
  };