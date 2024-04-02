// 4. Currencies convertor. Will be called when button is clicked or "Enter" is pressed
import { getCoins } from './getcoins.js';
import {getParams } from './getparams.js';
import { targetCoin, baseCoin, amount, result } from '../elements.js';

function convertCoin() {
  if (amount.value == "" || targetCoin.value === baseCoin.value) {
    result.style.color = 'red';
  } else {
    result.style.color = 'black';
  }

  const params = getParams(amount.value, targetCoin.value, baseCoin.value);

  // (getCoins() is called with arguments)
  getCoins (params)
    // Success fetching scenario
    .then(function(data) {
        result.textContent = `${amount.value} ${targetCoin.value} = ${Object.values(data.rates)} ${baseCoin.value}`;
    })
    // Failed fetching scenario
    .catch(function() {
      result.textContent = `Please, carefully check you input data`;
    })
}

export { convertCoin }