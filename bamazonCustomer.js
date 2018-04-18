var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

function readProducts() {
    console.log("Finding all products...\n");
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var prodIndex = 0; prodIndex < data.length; prodIndex++)
            console.log("ID: " + data[prodIndex].item_id + ".  " + data[prodIndex].product_name + "  $" + data[prodIndex].price + ".00  \n");
   // connection.end();
        });
};

readProducts();

inquirer.prompt([{
        message: "Please enter the ID# of the item you would like to purchase:",
        name: 'id',
        validate: function (value) {
            value = parseInt(value);
            return !isNaN(value);
        }
    },
    {
        message: "Enter the quantity of items you would like to purchase:",
        name: 'quantity',
        validate: function (value) {
            value = parseInt(value);
            return !isNaN(value);
        }
    }
]).then(function (answer) {
    checkStock(answer.id, answer.quantity);

});

function checkStock(id, quant) {
    connection.query("SELECT * FROM products WHERE ?", {
            item_id: id,
        },
        function (err, data) {
            if (data[0].stock_quantity < quant) {
                console.log("Insufficient quantity!");
                connection.end();
            } else {
                var newQuantity = data[0].stock_quantity - quant;
                var totalPrice = data[0].price * quant;
                var totalSales = data[0].product_sales + totalPrice;
                updateProduct(id, newQuantity, totalSales);
                console.log("The total for your purchase of " + data[0].product_name + " is $" + data[0].price * quant + ".00. Thank you for your order!");
            }
        }
    );
};

function updateProduct(id, newQuant, sales) {
    connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQuant,
                product_sales: sales
            },
            {
                item_id: id
            },
        ],
        function (err, data) {
            if (err) throw err;
            connection.end();
        }
    );
};