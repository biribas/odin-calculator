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

  [...numberButtons].forEach(button => button.addEventListener('click', e => addNumber(e.target.innerText, currentValue)));
  [...operatorButtons].forEach(button => button.addEventListener('click', e => addOperator(e.target.innerText, info, currentValue, equation)));
  equalButton.addEventListener('click', () => handleEqual(info, currentValue, equation));
  
  deleteButton.addEventListener('click', () => deleteInput(currentValue));
  clearButton.addEventListener('click', () => clear(info, currentValue, equation));
  
  signButton.addEventListener('click', () => toggleSign(currentValue));
  pointButton.addEventListener('click', () => addPoint(currentValue));
}

document.addEventListener('DOMContentLoaded', main);

function addNumber(number, currentValue) {
  if (currentValue.innerText === '0' || !isNum(currentValue.innerText))
    currentValue.innerText = number;
  else if (currentValue.innerText.length < 15)
    currentValue.innerText = currentValue.innerText + number;
}

function addOperator(operator, info, currentValue, equation) {
  if (info.previousValue === '')
    info.previousValue = currentValue.innerText;
  else {
    info.previousValue = operate(+info.previousValue, info.currentOperator, +currentValue.innerText);
  }
  info.currentOperator = operator;
  currentValue.innerText = '0';
  equation.innerText = `${info.previousValue} ${operator}`;
}

function handleEqual(info, currentValue, equation) {
  if (info.currentOperator === '') return;
  const result = operate(+info.previousValue, info.currentOperator, +currentValue.innerText);
  if (isNum(result)) {
    equation.innerText = `${info.previousValue} ${info.currentOperator} ${currentValue.innerText} =`;
    info.previousValue = currentValue.innerText;
    currentValue.innerText = result;
  }
  else {
    clear(info, currentValue, equation);
    currentValue.innerText = 'Math error';
  }
}

function operate(a, operator, b) {
  const f = op => {
    switch (op) {
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
  
  return f(operator)(a, b);
}

function deleteInput(currentValue) {
  currentValue.innerText = currentValue.innerText.slice(0, -1);
  if (currentValue.innerText.length === 0) 
    currentValue.innerText = '0';
}

function clear(info, currentValue, equation) {
  info.currentOperator = info.previousValue = '';
  equation.innerText = '';
  currentValue.innerText = '0';
}

function toggleSign(currentValue) {
  currentValue.innerText = -1 * (+currentValue.innerText);
}

function addPoint(currentValue) {
  if (currentValue.innerText.includes('.')) return;
  currentValue.innerText = currentValue.innerText + '.';
}

function isNum(num) {
  if (isFinite(num) && !isNaN(num))
    return true;

  return false;
}