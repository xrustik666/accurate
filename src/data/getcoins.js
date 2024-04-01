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
        throw new Error('Network response was not ok: ' + response.status);
      }
      
      return response.json();
    })
    .catch(function(error) {
      console.error('Error:', error);
    })
}

export { getCoins };