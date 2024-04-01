// 3. Returns string that will be used as an argument for getCoins()
function getParams(amount, convertFrom, convertTo) {
  const result = `?amount=${amount}&from=${convertFrom}&to=${convertTo}`;

  return result;
}

export { getParams }