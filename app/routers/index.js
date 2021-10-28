module.exports = (app) => {
    const controllers = require("../controllers");
    let router = require("express").Router();
  
    router.get("/cart", controllers.cart.postOrder);

    router.post("/discount", controllers.discount.create);
    router.get("/discount", controllers.discount.findAll);
    router.get("/discount/:id", controllers.discount.findOne);
    router.put("/discount/:id", controllers.discount.update);
    router.delete("/discount/:id", controllers.discount.delete);

    router.post("/order", controllers.order.create);
    router.get("/order", controllers.order.findAll);
    router.get("/order/:id", controllers.order.findOne);
    router.put("/order/:id", controllers.order.update);
    router.delete("/order/:id", controllers.order.delete);

    router.post("/order_detail", controllers.order_detail.create);
    router.get("/order_detail", controllers.order_detail.findAll);
    router.get("/order_detail/:id", controllers.order_detail.findOne);
    router.put("/order_detail/:id", controllers.order_detail.update);
    router.delete("/order_detail/:id", controllers.order_detail.delete);

    router.post("/payment", controllers.payment.create);
    router.get("/payment", controllers.payment.findAll);
    router.get("/payment/:id", controllers.payment.findOne);
    router.put("/payment/:id", controllers.payment.update);
    router.delete("/payment/:id", controllers.payment.delete);

    router.post("/product", controllers.product.create);
    router.get("/product", controllers.product.findAll);
    router.get("/product/:id", controllers.product.findOne);
    router.put("/product/:id", controllers.product.update);
    router.delete("/product/:id", controllers.product.delete);

    router.post("/product_category", controllers.product_category.create);
    router.get("/product_category", controllers.product_category.findAll);
    router.get("/product_category/:id", controllers.product_category.findOne);
    router.put("/product_category/:id", controllers.product_category.update);
    router.delete("/product_category/:id", controllers.product_category.delete);

    router.post("/user", controllers.user.create);
    router.get("/user", controllers.user.findAll);
    router.get("/user/:id", controllers.user.findOne);
    router.put("/user/:id", controllers.user.update);
    router.delete("/user/:id", controllers.user.delete);

    app.use("/api", router);
  };
  