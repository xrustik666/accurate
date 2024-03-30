const groups = document.querySelector('.select-group').children;
const targetCoin = groups[0];
const baseCoin = groups[1];

const amount = document.querySelector('.amount');
const result = document.querySelector('.result');

const button = document.querySelector('button');

// Get all needed data from site
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

// (getCoins() was called without arguments)
// Get currencies names. Append them into select lists
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

// This function will be used as an argument for getCoins()
function getParams(amount, convertFrom, convertTo) {
  const result = `?amount=${amount}&from=${convertFrom}&to=${convertTo}`;

  return result;
}

// Processing of all functions
function main() {
  setCoinsList();
  
  button.addEventListener('click', function() {
    const params = getParams(amount.value, targetCoin.value, baseCoin.value);

    // (getCoins() was called with arguments)
    getCoins (params)
      .then(function(data) {
        if (targetCoin.value === baseCoin.value) {
          result.textContent = amount.value;
        } else {
          result.textContent = Object.values(data.rates);
        }
        
      })
  });
}

// Call main function after the page is loaded
window.addEventListener('load', main);