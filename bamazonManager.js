var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'root',
    resbase: 'bamazon_db'
});

var choicesArray = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'];

inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'Welcome to the Management Tool. Please select an action from the menu:',
    choices: choicesArray
}]).then(function (answer) {
    methods[answer.action]();
});


var methods = {
    'View Products for Sale': function () {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

            for (var prodIndex = 0; prodIndex < res.length; prodIndex++) {
                console.log("ID: " + res[prodIndex].item_id + " |  " + res[prodIndex].product_name + " |  $" + res[prodIndex].price + ".00  | In Stock:  " + res[prodIndex].stock_quantity + "\n");
            }
            connection.end();
        });
    },
    'View Low Inventory': function () {
        connection.query("SELECT * FROM products WHERE stock_quantity <5", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            if (!res === []) {
                console.log(res);
            } else {
                console.log("There are no products where inventory is below 5.")
            }

            connection.end();
        });
    },
    'Add to Inventory': function () {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            var productArray = [];
            for (var prodIndex = 0; prodIndex < res.length; prodIndex++) {
                productArray.push(res[prodIndex].product_name);
            }

            inquirer.prompt([{
                    type: 'list',
                    name: 'restock',
                    message: 'Which item would you like to restock?',
                    choices: productArray
                },
                {
                    message: 'How many more of this item would you like to stock?',
                    name: 'addToStock',
                    validate: function (value) {
                        var value = parseInt(value);
                        return !isNaN(value);
                    }
                }
            ]).then(function (answer) {
                connection.query("SELECT stock_quantity FROM products WHERE ?", [{
                    product_name: answer.restock
                }], function (err, res) {
                    var newStock = parseInt(answer.addToStock) + parseInt(res[0].stock_quantity);
                    updateStock(answer.restock, newStock);
                });
            });
        });
    },
    'Add New Product': function () {
        inquirer.prompt([{
                name: 'name',
                message: 'Enter the name of the new product:',
            },
            {
                name: 'department',
                message: 'What department is this product in?:',
            },
            {
                name: 'price',
                message: 'What is the price of this product?',
                validate: function (value) {
                    var value = parseInt(value);
                    return !isNaN(value);
                }
            },
            {
                name: 'stock',
                message: 'How many would you like to stock?',
                validate: function (value) {
                    var value = parseInt(value);
                    return !isNaN(value);
                }
            }
        ]).then(function (answer) {

            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: parseInt(answer.price),
                    stock_quantity: parseInt(answer.stock)
                },
                function (err, res) {
                    console.log(res.affectedRows + " product added!\n");
                    connection.end();
                }
            );
        });
    }
};

function updateStock(name, quant) {
    connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: quant
            },
            {
                product_name: name
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("Restock successful!");
            connection.end();
        }
    );
};