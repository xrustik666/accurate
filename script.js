const groups = document.querySelector('.select-group').children;
const targetCoin = groups[0];
const baseCoin = groups[1];

const amount = document.querySelector('.amount');
const result = document.querySelector('.result');

const button = document.querySelector('button');

// 1. Gets all needed data from site
function getCoins (params) {
  let address = '';
  // if function is called without arguments, data will be fetched from "/latest". 
  // Otherwise from "?amount=AMOUNT&from='CURRENCY1'&to='CURRENCY2'"
  if (!params) {
    address = 'https://api.frankfurter.app/latest'
  } else address = 'https://api.frankfurter.app/latest' + params;

  return fetch(address)
    .then(function(response) {
      
      return response.json();
    })
}

// 2. Gets currencies names. Append them into select lists
// (getCoins() is called without arguments)
function setCoinsList() {
  getCoins()
    .then(coins => {
      for (let i = 0; i < groups.length; i++) {
        for (const key in coins.rates) {
          const coin = document.createElement('option');
          coin.textContent = key;
          coin.value = key;
          
          groups[i].appendChild(coin);
        }
      }
    });
}

// 3. Returns string that will be used as an argument for getCoins()
function getParams(amount, convertFrom, convertTo) {
  const result = `?amount=${amount}&from=${convertFrom}&to=${convertTo}`;

  return result;
}

// 4. Currencies convertor. Will be called when button is clicked or "Enter" is pressed
function convertCoin() {
  if (amount.value === "") {
    result.style.color = 'red';
    result.textContent = 'Please, enter amount';
  } else {
    result.style.color = 'black';
  }

  if (targetCoin.value === baseCoin.value && amount.value !== "") {
    result.textContent = amount.value;
  }

  const params = getParams(amount.value, targetCoin.value, baseCoin.value);

  // (getCoins() is called with arguments)
  getCoins (params)
    .then(function(data) {
        result.textContent = Object.values(data.rates);
    })
}

// Processing of all functions
function main() {
  setCoinsList();
  
  button.addEventListener('click', convertCoin);

  // Press "Enter" === click button
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Enter") {
      convertCoin();
    }
  });

  // Clear input field and converting results by pressing "Escape"
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      amount.value = "";
      result.textContent = "----";
    }
  });
}

// Call main function after the page is loaded
window.addEventListener('load', main);