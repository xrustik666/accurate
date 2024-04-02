import { amount, result, convertButton, archiveButton } from './components/elements.js';
import { setCoinsList } from './data/setcoinslist.js';
import { convertCoin } from './data/convertcoin.js';
import { generateArchiveRates } from './data/generatearchiverates.js';
import { showArchivePage } from './components/showarchivepage.js';

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

  archiveButton.addEventListener('click', showArchivePage);
  archiveButton.addEventListener('click', generateArchiveRates);
}

// Call main function after the page is loaded
window.addEventListener('load', main);