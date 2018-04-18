var inquirer = require("inquirer");
var mysql = require("mysql");

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
    console.log('you clicked view sales!');

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
                //console.log(res);
                 console.log(res.affectedRows + " department added!\n");
                connection.end();
            }
        );
    });
};