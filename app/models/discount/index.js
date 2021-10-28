module.exports = (sequelize, Sequelize) => {
    const discount = sequelize.define("discount", {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      discount_percent: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
    });
    return discount;
  };
  