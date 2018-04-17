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
        // Log all results of the SELECT statement
        for (var prodIndex = 0; prodIndex < data.length; prodIndex++)
            console.log("ID: " + data[prodIndex].item_id + ".  " + data[prodIndex].product_name + "  $" + data[prodIndex].price + ".00  \n");
        //connection.end();
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
    placeOrder(answer.id, answer.quantity);

});

//1 check if we have enough.
//2 opt out or complete update

function placeOrder(id, quant) {
    connection.query("SELECT item_id, product_name, price, stock_quantity WHERE ?", {
            item_id: id,
        },
        function (err, data) {
            if (data.stock_quantity < quant) {
                console.log("Insufficient quantity!")
            } else {
                console.log("your order can go through!")
            }
        }
    );
};