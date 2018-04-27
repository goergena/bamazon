# bamazon


## Manager userflow

<img src="https://github.com/goergena/bamazon/raw/master/images/Manager-tool-list.png" alt="bamazonManager.js userflow">
when the user opens the command line and enters "node bamazonManager.js", s/he is prompted with the bamazonManager options list. The manager scrolls through and hits *enter* to choose which of the 4 manager tools s/he would like to use.

### Option 1: View Products for Sale

When the manager selects this option, s/he is given a list of all of the products for sale, including the department and inventory information.
<img src="https://github.com/goergena/bamazon/raw/master/images/Manager-view-products-for-sale.png" alt="bamazonManager.js view products for sale">


### Option 2: View Low Inventory

When the manager selects this option, s/he is given a list of all of the products with an inventory number lower than 5.
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-view-low-inventory.png" alt="bamazonManager.js list of inventory items under 5">

If there are no items with an inventory below 5, s/he is given this message instead:

<img src="https://github.com/goergena/bamazon/raw/master/images/Manager-low-inventory-none.png" alt="bamazonManager.js view low inventory- no items with inventory under 5">

### Option 3: Add to Inventory

When the manager selects this option, s/he is given a prompt that lists all of the products. The manager scrolls through and hits *enter* to select the product to add.
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-add-to-inventory.png" alt="bamazonManager.js add to inventory- choose which product to add to">

After the manager selects the product, s/he is prompted with how many items s/he would like to add to stock. The manager types in a number. After the product is updated, a success message is displayed.
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-add-to-inventory2.png" alt="bamazonManager.js add to inventory- success">

We can return to "view products for sale" and see that the inventory has increased.
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-after-add-to-inventory.png" alt="bamazonManager.js view products for sale- inventory for selected product has increased ">


### Option 4: Add New Product

When this option is selected, the manager is given a prompt that goes through all the necessary steps to add a new product. 
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-add-new-product.png" alt="bamazonManager.js prompts to add new product ">


We can return to "view products for sale" and see that the new product has been added.
<img src="https://github.com/goergena/bamazon/raw/master/images/manager-after-product-added.png" alt="bamazonManager.js view products for sale- new product is displayed ">
The item_id increments automatically.

## Customer userflow
When the user opens the command line and enters "node bamazonCustomer.js", s/he is given a list of the products, their IDs, and their prices. The customer is prompted to enter the ID number of the item s/he would like to purchase
<img src="https://github.com/goergena/bamazon/raw/master/images/Customer-flow1.png" alt="bamazonCustomer.js list of items and prompt enter ID# of item you would like to purchase ">

Then, the customer is prompted how many of the item s/he would like to buy.
<img src="https://github.com/goergena/bamazon/raw/master/images/Customer-flow2.png" alt="bamazonCustomer.js prompt- how many items ">

### Insufficient Quantity

<img src="https://github.com/goergena/bamazon/raw/master/images/customer-flow-insufficient-quantity.png" alt="bamazonCustomer.js message insufficient quantity">

In this example, the customer tried to buy 42 pairs of tap shoes, but there are only 40 pairs of tap shoes in stock. S/he is told that there is an insufficient quantity, and the sale cannot go through. This will happen whenever a customer tries to buy more items than are in the stock.


### Successful Sale

When a sale can go through, the customer is told their total price.
<img src="https://github.com/goergena/bamazon/raw/master/images/customer-flow-sale.png" alt="bamazonCustomer.js purchase is successful">


### Stock Decreases Accordingly

After a sale goes through, the stock decreases accordingly. We can see this on the manager page:
<img src="https://github.com/goergena/bamazon/raw/master/images/customer-inventory-updates.png" alt="bamazonManager.js view products for sale- inventory for selected product has decreased">
There are now only 23 pairs of tap shoes in stock after the purchase has gone through.

### Item sales increases

Every time an item is sold, the dollar amount of sales for that item increases. This value is stored in the table of products for each product sold. 

## Supervisor userflow

When the user opens the command line and enters "node bamazonSupervisor.js", s/he is taken to the Supervisor tool and given a list of supervisor options. 
<img src="https://github.com/goergena/bamazon/raw/master/images/supervisor-options.png" alt="bamazonSupervisor.js list of actions">
The supervisor has the option to create a new department or to view the total sales of each department.

### Create a new department

When the supervisor chooses to create a new department, s/he encounters a prompt to help create the new department. 

<img src="https://github.com/goergena/bamazon/raw/master/images/supervisor-create-dept.png" alt="bamazonSupervisor.js create a department"> 

The supervisor must name the department and give the overhead cost of the department. The department id will be added automatically. The supervisor receives a response that the department was added successfully.

### View Sales By Department

The supervisor can choose to view sales by department. A table will pop up listing every department, overhead costs, total department sales, and the net profit for each department. Total sales is calculated as the sum of the sales for each product in each department. The department profit is calculated by subtracting the overhead costs from the total sales. 

<img src="https://github.com/goergena/bamazon/raw/master/images/supervisor-view-sales.png" alt="bamazonSupervisor.js view sales by department"> 

