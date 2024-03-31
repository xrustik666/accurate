const groups = document.querySelector('.select-group').children;
const targetCoin = groups[0];
const baseCoin = groups[1];

const amount = document.querySelector('.amount');
const result = document.querySelector('.result');
const convertButton = document.querySelector('.convertButton');

const fromDate = document.querySelector('.from-date');
const toDate = document.querySelector('.to-date');
const archiveButton = document.querySelector('.archiveButton');
const archiveRatesList = document.querySelector('.archive-rates-list');

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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    })
    .catch(function(error) {
      console.error('Error:', error);
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
    result.textContent = `${amount.value} ${baseCoin.value}`;
  }

  const params = getParams(amount.value, targetCoin.value, baseCoin.value);

  // (getCoins() is called with arguments)
  getCoins (params)
    .then(function(data) {
        result.textContent = `${amount.value} ${targetCoin.value} = ${Object.values(data.rates)} ${baseCoin.value}`;
    })
}

// 5. Shows the exchange rate in previous time periods
function generateArchiveRates() {
  return fetch(`https://api.frankfurter.app/${fromDate.value}..${toDate.value}?to=${baseCoin.value}&from=${targetCoin.value}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(function(error) {
      console.error('Error:', error);
    })
    .then(function(data) {
      // if the page already contains some archive data, it will be deleted
      archiveRatesList.innerHTML = '';

      // checks if there is some data about rates > add title 'Archive rates' on the page
      if (data.rates != '') {
        const archiveListTitle = document.createElement('h2');
        archiveListTitle.textContent = 'Archive rates';
        archiveRatesList.appendChild(archiveListTitle);
      }
      
      // add data about archive rates on the page
      for (const day in data.rates) {
        const archiveElement = document.createElement('li');
        archiveElement.textContent = `by the date of ${day}, the exchange rate of ${targetCoin.value} was ${Object.values(data.rates[day])} ${baseCoin.value}`;
        
        archiveRatesList.appendChild(archiveElement);
      }
    })
}

// 6. Processes of all functions
function main() {
  setCoinsList();
  
  convertButton.addEventListener('click', convertCoin);

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

  archiveButton.addEventListener('click', generateArchiveRates);
}

// Call main function after the page is loaded
window.addEventListener('load', main);