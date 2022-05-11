const welcomeMessage = document.getElementById("greeting");
const balance = document.querySelector(".current-balance");
const dashboard = document.querySelector(".dashboard");
const transactionsContainer = document.querySelector(".transactions-container");
const movementsContainer = document.querySelector(".movements");
const inputName = document.querySelector("#login-username");
const accPin = document.querySelector("#login-password");
const submit = document.querySelector("#login-submit");

const account1 = {
  name: "Shiva",
  userName: "shiva",
  password: 1234,
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 5000],
  interestRate: 1.5,
};
const account2 = {
  name: "Mauricio",
  userName: "mauricio",
  password: 1234,
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 50, 3000],
  interestRate: 1.2,
};
const account3 = {
  name: "Andrew",
  userName: "andrew",
  password: 1234,
  movements: [-200, 450, 400, 3000, -650, -130, 70, 1300, 50],
  interestRate: 1.5,
};

const accounts = [account1, account2, account3];

//Function to display transactions
const displayTransactions = function (movements) {
  transactionsContainer.innerHTML = "";
  movements.forEach(function (mov, i) {
    const html = `<div class="transaction"> Transaction ${
      i + 1
    } : ${mov} $</div>`;
    transactionsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

//Function to calculate balance
const calcBalance = function (movements) {
  const currentBalance = movements.reduce((acc, mov) => acc + mov, 0);
  balance.textContent = `${currentBalance} $`;
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
  }
});
