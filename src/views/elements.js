// Preparing all elements needed to use
const groups = document.querySelector('.select-group').children;
const targetCoin = groups[0];
const baseCoin = groups[1];

const amount = document.querySelector('.amount');
const result = document.querySelector('.result');
const convertButton = document.querySelector('.convert-button');

const fromDate = document.querySelector('.from-date');
const toDate = document.querySelector('.to-date');
const archiveButton = document.querySelector('.archive-button');
const archiveRatesList = document.querySelector('.archive-rates-list');
const archiveResults = document.querySelector('.archive-results');

export { groups, targetCoin, baseCoin, amount, result, convertButton, fromDate, toDate, archiveButton, archiveRatesList, archiveResults };