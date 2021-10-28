module.exports = (sequelize, Sequelize) => {
    const product_category = sequelize.define("product_category", {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    return product_category;
  };
  