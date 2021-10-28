module.exports = (sequelize, Sequelize) => {
    const payment = sequelize.define("payment", {
      order_id: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      provider: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
    });
    return payment;
  };
  