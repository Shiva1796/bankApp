const welcomeMessage = document.getElementById("greeting");
const balance = document.querySelector(".current-balance");
const dashboard = document.querySelector(".dashboard");
const transactionsContainer = document.querySelector(".transactions-container");
const transactions = document.querySelectorAll(".transactions");
const movementsContainer = document.querySelector(".movements");
const inputName = document.querySelector("#login-username");
const accPin = document.querySelector("#login-password");
const submit = document.querySelector("#login-submit");
const approval = document.querySelector("#submit-btn");
const amount = document.querySelector("#amount");
const loanMessage = document.querySelector("#message");

const account1 = {
  name: "Shiva",
  userName: "shiva",
  password: 1234,
  movements: [
    5000, 3400, -150, -790, -3210, -1000, 8500, -30, 5000, 200, 450, -400, 3000,
  ],
  interestRate: 1.5,
};
const account2 = {
  name: "Mauricio",
  userName: "mauricio",
  password: 1234,
  movements: [
    200, 450, -400, 3000, -650, -130, 70, 1300, 50, 3000, 5000, 3400, -150,
    -790, -3210, -1000, 8500, -30, 5000,
  ],
  interestRate: 1.2,
};
const account3 = {
  name: "Andrew",
  userName: "andrew",
  password: 1234,
  movements: [
    -200, 450, 400, 3000, -650, -130, 70, 1300, 50, 200, 450, -400, 3000, -650,
    -130, 70, 1300, 50, 3000, 5000, 3400,
  ],
  interestRate: 1.5,
};

const accounts = [account1, account2, account3];

//Function to display transactions
const displayTransactions = function (movements) {
  transactionsContainer.innerHTML = "";
  movements.forEach(function (mov, i) {
    const html = `<div class="transactions">
    <div class="transaction-number">${i + 1}</div>
    <div class="transaction">${mov}</div></div>`;
    transactionsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

//Function to calculate balance
const calcBalance = function (movements) {
  const currentBalance = movements.reduce((acc, mov) => acc + mov, 0);
  balance.textContent = `Your current balance is ${currentBalance} $`;
};

let currentAccount;
//Logic for logging in

submit.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.userName === inputName.value);

  if (currentAccount?.password === Number(accPin.value)) {
    welcomeMessage.textContent = `Welcome back, ${
      currentAccount.name.split(" ")[0]
    }`;

    //Using the current account variable whenever a user logs in their current balance and transactions will be shown
    calcBalance(currentAccount.movements);
    displayTransactions(currentAccount.movements);
    loanApproval(currentAccount.movements);
  }
});
const loanApproval = function (movements) {
  const currentBalance = movements.reduce((acc, mov) => acc + mov, 0);
  approval.addEventListener("click", function (e) {
    e.preventDefault();
    if (amount.value >= 1000 && amount.value < 2 * currentBalance) {
      return (loanMessage.textContent =
        "Your loan will be reviewed and you will be contacted shortly!");
    } else if (amount.value < 1000) {
      return (loanMessage.textContent =
        "Sorry but we do not loan less than $1000");
    } else {
      return (loanMessage.textContent =
        "Sorry but we do not loan more than twice the account balance");
    }
  });
};
