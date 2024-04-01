import { getCoins } from './getcoins.js';
import { groups, targetCoin, baseCoin, amount, result, convertButton, fromDate, toDate, archiveButton, archiveRatesList } from '../elements.js';

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

export { setCoinsList };