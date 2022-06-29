
function main() {
  const info = {
    previousValue: '',
    currentOperator: '' 
  }

  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');

  const deleteButton = document.querySelector('#delete');
  const clearButton = document.querySelector('#clear');

  const signButton = document.querySelector('#sign');
  const pointButton = document.querySelector('#point');
  const equalButotn = document.querySelector('#equal');

  const currentValue = document.querySelector('#currentValue');
  const equation = document.querySelector('#equation');

  [...numberButtons].forEach(button => button.addEventListener('click', e => handleNumber(e.target.innerText, currentValue)));
  [...operatorButtons].forEach(button => button.addEventListener('click', e => handleOperator(e.target.innerText, info, currentValue, equation)));
}

function handleNumber(number, currentValue) {
  if (currentValue.innerText === '0')
    currentValue.innerText = number;
  else if (currentValue.innerText.length < 15)
    currentValue.innerText = currentValue.innerText + number;
}

function handleOperator(operator, info, currentValue, equation) {
  info.currentOperator = operator;
  info.previousValue = currentValue.innerText;
  currentValue.innerText = '0';
  equation.innerText = `${info.previousValue} ${info.currentOperator}`;
}

document.addEventListener('DOMContentLoaded', main);