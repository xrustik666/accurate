import { groups, targetCoin, baseCoin, amount, result, convertButton, fromDate, toDate, archiveButton, archiveRatesList } from '../elements.js';

// 5. Shows the exchange rate in previous time periods
function generateArchiveRates() {
  return fetch(`https://api.frankfurter.app/${fromDate.value}..${toDate.value}?to=${baseCoin.value}&from=${targetCoin.value}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
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

      // checks if both dates are not empty
      if ((fromDate.value && toDate.value) === "") {
        archiveRatesList.innerHTML = '';
      }
      
      // add data about archive rates on the page
      for (const day in data.rates) {
        const archiveElement = document.createElement('li');
        archiveElement.textContent = `by the date of ${day}, the exchange rate of ${targetCoin.value} was ${Object.values(data.rates[day])} ${baseCoin.value}`;
        
        archiveRatesList.appendChild(archiveElement);
      }
    })
}

export { generateArchiveRates }