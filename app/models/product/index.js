module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define("product", {
    category_id: {
      type: Sequelize.INTEGER,
    },
    discount_id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
  });
  return product;
};
