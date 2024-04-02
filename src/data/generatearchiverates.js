import { generateArchiveFail } from '../views/generate-archive-fail.js';
import { generateArchiveSuccess } from '../views/generate-archive-success.js';
import { targetCoin, baseCoin, fromDate, toDate } from '../views/elements.js';


// 5. Shows the exchange rate in previous time periods
function generateArchiveRates() {
  return fetch(`https://api.frankfurter.app/${fromDate.value}..${toDate.value}?to=${baseCoin.value}&from=${targetCoin.value}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
      }

      return response.json();
    })
    // Success fetching scenario
    .then(generateArchiveSuccess)
    // Failed fetching scenario
    .catch(generateArchiveFail)
}

export { generateArchiveRates }