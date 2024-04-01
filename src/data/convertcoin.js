// 4. Currencies convertor. Will be called when button is clicked or "Enter" is pressed
import { getCoins } from './getcoins.js';
import {getParams } from './getparams.js';
import { targetCoin, baseCoin, amount, result } from '../elements.js';

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

export { convertCoin }