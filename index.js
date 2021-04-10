//
const fs = require("fs");
const inquirer = require("inquirer");

//
// Prompt user with questions
inquirer
  .prompt([
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
  ])
  .then((response) => {
    console.log(response);

    const orderName = `order-${response.name
      .toLowerCase()
      .split(" ")
      .join("")}.txt`;

    fs.writeFile(orderName, JSON.stringify(response, null, "\t"), (err) =>
      err ? console.error(err) : console.log("Success!")
    );
  });
