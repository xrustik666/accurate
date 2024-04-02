import { archiveRatesList } from './elements.js';
import { scrollToArchive } from './scrolltoarchive.js';

function generateArchiveFail() {
  scrollToArchive();
  
  // if the page already contains some archive data, it will be deleted
  archiveRatesList.innerHTML = '';

  archiveRatesList.innerHTML = 'No information for this time period or for this currency pair';
}

export { generateArchiveFail };