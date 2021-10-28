Answer
Based on the stated facts
1. On the application when an order comes in there is no product stock checking or stock checking after the order is entered
2. There must be a product stock check on the application after check out of the cart and the data has not been entered into the order table
3. Proof of concept
a. install node.js
b. install dependencies: npm install sequelize express cors mysql2
c. install nodemon: npm install -g nodemon. nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected
d. install WAMP Server or XAMP for mysql
e. install Postman for check API local
f. Table will auto generate based on model bacause used db.sequelize.sync() but must create evermos database
g. API for check http://localhost:8081/api/cart
h. payload from body 
[
    {
        "user_id":1,
        "product_id": 1,
        "quantity": 2
    },
    {
        "user_id":1,
        "product_id": 2,
        "quantity": 2
    }
]
i. run server on local machine : npm start

