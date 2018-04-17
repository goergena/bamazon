var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

var choicesArray = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'];

var methods = {
    'View Products for Sale': function () {
        connection.query("SELECT * FROM products", function (err, data) {
            if (err) throw err;

            for (var prodIndex = 0; prodIndex < data.length; prodIndex++) {
                console.log("ID: " + data[prodIndex].item_id + " |  " + data[prodIndex].product_name + " |  $" + data[prodIndex].price + ".00  | In Stock:  " + data[prodIndex].stock_quantity + "\n");
            }
            connection.end();
        });
    },
    'View Low Inventory': function () {
        connection.query("SELECT * FROM products WHERE stock_quantity <5", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            connection.end();
        });
    },
    'Add to Inventory': function () {
        connection.query("SELECT * FROM products", function (err, data) {
            if (err) throw err;
            var productArray = [];
            for (var prodIndex = 0; prodIndex < data.length; prodIndex++) {
                productArray.push(data[prodIndex].product_name);
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
                }], function(err, data) {
                    console.log(data[0].stock_quantity);
                    var newStock = parseInt(answer.addToStock) + parseInt(data[0].stock_quantity);
                    updateStock(answer.restock, newStock);
                });
            });
        });
    },
};

inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'Welcome to the Management Tool. Please select an action from the menu:',
    choices: choicesArray
}]).then(function (answer) {
    var call = answer.action;
    // console.log(answer);
    // console.log(answer.action);
    methods[call]();
    // methods['View Products for Sale']();

});


function updateStock(name, quant) {
    connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: quant
            },
            {
                product_name: name
            }
        ],
        function (err, data) {
            if (err) throw err;
            console.log("Restock successful!");
            connection.end();
        }
    );
};