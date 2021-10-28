module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
      user_id: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.DECIMAL,
      }
    });
    return order;
  };
  