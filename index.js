// Packages
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user with questions
const promptOrder = () => {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your name",
      name: "name",
    },
    {
      type: "input",
      message: "How many pizzas would you like to order?",
      name: "numPizzas",
    },
    {
      type: "checkbox",
      message: "What pizza toppings would you like?",
      choices: ["cheese", "pepperoni", "sausage", "onions", "peppers"],
      name: "toppings",
    },
    {
      type: "list",
      message: "Is this for pickup or delivery?",
      choices: ["Pickup", "Delivery"],
      name: "pickupOrDelivery",
    },
    {
      type: "list",
      message: "How will you be paying?",
      choices: ["Cash", "Debit", "Credit"],
      name: "paymentType",
    },
  ]);
};

const genOrderHTML = (data) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizza Order</title>
</head>

<body>
  <section class="order">
    <h1>Order for ${data.name}</h1>
    <h3>Pizza Order</h3>
    <p>Number of pizzas ordered: ${data.numPizzas}</p>
    <p>Pizza toppings: ${data.numPizzas}</p>
    <p>Pickup or Delivery: ${data.pickupOrDelivery}</p>
    <p>Payment method: ${data.paymentType}</p>
  </section>
</body>

</html>
`;

const createOrder = () => {
  promptOrder()
    .then((response) => writeFileAsync("index.html", genOrderHTML(response)))
    .then(() => console.log("Success!"))
    .catch((err) => console.error(err));
};

// Script Execution
createOrder();

// .then((response) => {
//   console.log(response);

//   const orderName = `order-${response.name
//     .toLowerCase()
//     .split(" ")
//     .join("")}.txt`;

//   fs.writeFile(orderName, JSON.stringify(response, null, "\t"), (err) =>
//     err ? console.error(err) : console.log("Success!")
//   );
// });
