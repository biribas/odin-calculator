function main() {
  const info = {
    previousValue: '',
    currentOperator: '' 
  }

  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const equalButton = document.querySelector('#equal');

  const deleteButton = document.querySelector('#delete');
  const clearButton = document.querySelector('#clear');

  const signButton = document.querySelector('#sign');
  const pointButton = document.querySelector('#point');

  const currentValue = document.querySelector('#currentValue');
  const equation = document.querySelector('#equation');

  [...numberButtons].forEach(button => button.addEventListener('click', e => handleNumber(e.target.innerText, currentValue)));
  [...operatorButtons].forEach(button => button.addEventListener('click', e => handleOperator(e.target.innerText, info, currentValue, equation)));
  equalButton.addEventListener('click', () => handleEqual(info, currentValue, equation));
  
  deleteButton.addEventListener('click', () => handleDelete(currentValue));
  clearButton.addEventListener('click', () => handleClear(info, currentValue, equation));
  
  signButton.addEventListener('click', () => handleSign(currentValue));
  pointButton.addEventListener('click', () => handlePoint(currentValue));
}

document.addEventListener('DOMContentLoaded', main);

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
  equation.innerText = `${info.previousValue} ${operator}`;
}

function handleEqual(info, currentValue, equation) {
  const operation = handleOperation(info.currentOperator);
  const result = operation(+info.previousValue, +currentValue.innerText)
  equation.innerText = `${info.previousValue} ${info.currentOperator} ${currentValue.innerText} =`;
  info.previousValue = currentValue.innerText;
  currentValue.innerText = result;
}

function handleOperation(operator) {
  switch (operator) {
    case '+':
      return (a, b) => a + b;
    case '-':
      return (a, b) => a - b;
    case 'x':
      return (a, b) => a * b;
    case '÷':
      return (a, b) => a / b;
    case 'mod': 
      return (a, b) => a % b;
    default:
      return () => console.error('Invalid Operator');
  }
}

function handleDelete(currentValue) {
  currentValue.innerText = currentValue.innerText.slice(0, -1);
  if (currentValue.innerText.length === 0) 
    currentValue.innerText = '0';
}

function handleClear(info, currentValue, equation) {
  info.currentOperator = info.previousValue = '';
  currentValue.innerText = '0';
  equation.innerText = '';
}

function handleSign(currentValue) {
  currentValue.innerText = -1 * (+currentValue.innerText);
}

function handlePoint(currentValue) {
  if (currentValue.innerText.includes('.')) return;
  currentValue.innerText = currentValue.innerText + '.';
}
