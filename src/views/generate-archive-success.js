import { targetCoin, baseCoin, fromDate, toDate, archiveRatesList } from './elements.js';
import { scrollToArchive } from './scrolltoarchive.js';

function generateArchiveSuccess(data) {
  scrollToArchive();
  
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
    archiveRatesList.innerHTML = 'Please, select time period';
  }
  
  // add data about archive rates on the page
  for (const day in data.rates) {
    const archiveElement = document.createElement('li');
    archiveElement.textContent = `by the date of ${day}, the exchange rate of ${targetCoin.value} was ${Object.values(data.rates[day])} ${baseCoin.value}`;
    
    archiveRatesList.appendChild(archiveElement);
  }
}

export { generateArchiveSuccess };