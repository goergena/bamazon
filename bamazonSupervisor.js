var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'Welcome to the Supervisor Tool. Please select an action from the menu:',
    choices: ['View Product Sales by Department', 'Create New Department']
}]).then(function (answer) {
    if (answer.action === 'View Product Sales by Department') {
        viewSales();
    } else {
        createDept();
    }
});


function viewSales() {
    connection.query("SELECT departments.department_ID, departments.department_name, departments.overhead_costs,  " +
        "SUM(products.product_sales) AS 'Dept_sales', (SUM(products.product_sales) - (departments.overhead_costs)) AS 'Dept_profit'  " +
        "FROM departments LEFT JOIN products " +
        "ON (departments.department_name = products.department_name) GROUP BY departments.department_ID",
        function (err, res) {
            if (err) throw (err);
            console.table('Product Sales by Department', res);
            connection.end();
        });
};

function createDept() {
    inquirer.prompt([{
            name: 'department',
            message: 'What is the name of the new department?',
        },
        {
            name: 'overhead',
            message: 'What is the overhead cost of this department?',
            validate: function (value) {
                var value = parseInt(value);
                return !isNaN(value);
            }
        },

    ]).then(function (answer) {

        connection.query(
            "INSERT INTO departments SET ?", {
                department_name: answer.department,
                overhead_costs: answer.overhead,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added!\n");
                connection.end();
            }
        );
    });
};