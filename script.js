const info = {
  previousValue: '',
  currentOperator: '' 
}

const elements = {
  numberButtons: document.querySelectorAll('.number'),
  operatorButtons: document.querySelectorAll('.operator'),
  equalButton: document.querySelector('#equal'),
  deleteButton: document.querySelector('#delete'),
  clearButton: document.querySelector('#clear'),
  signButton: document.querySelector('#sign'),
  pointButton: document.querySelector('#point'),
  currentValue: document.querySelector('#currentValue'),
  equation: document.querySelector('#equation')
}

function main() {
  [...elements.numberButtons].forEach(button => button.addEventListener('click', e => addNumber(e.target.innerText)));
  [...elements.operatorButtons].forEach(button => button.addEventListener('click', e => addOperator(e.target.innerText)));
  elements.equalButton.addEventListener('click', handleEqual);
  
  elements.deleteButton.addEventListener('click', deleteInput);
  elements.clearButton.addEventListener('click', clear);
  
  elements.signButton.addEventListener('click', toggleSign);
  elements.pointButton.addEventListener('click', addPoint);
}

document.addEventListener('DOMContentLoaded', main);

function addNumber(buttonNumber) {
  const currentValue = elements.currentValue.innerText;
  if (currentValue === '0' || !isNum(currentValue))
    elements.currentValue.innerText = buttonNumber;
  else if (currentValue.length < 15)
    elements.currentValue.innerText += buttonNumber;
}

function addOperator(operator) {
  if (!isNum(elements.currentValue.innerText)) return;
  let result = elements.currentValue.innerText;

  if (isNum(info.previousValue)) {
    result = operate();
    if (!isNum(result)) {
      clear();
      elements.currentValue.innerText = result;
      return;
    }
  }

  info.previousValue = result;
  info.currentOperator = operator;
  elements.equation.innerText = `${info.previousValue} ${operator}`;
  elements.currentValue.innerText = '0';
}

function handleEqual() {
  if (info.currentOperator === '') return;
  const result = operate();
  if (isNum(result)) {
    elements.equation.innerText = `${info.previousValue} ${info.currentOperator} ${elements.currentValue.innerText} =`;
    info.previousValue = elements.currentValue.innerText;
  }
  else {
    info.currentOperator = info.previousValue = '';
    elements.equation.innerText = '';
  }
  
  elements.currentValue.innerText = result;
}

function operate() {
  const f = operator => {
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

  const a = +info.previousValue;
  const b = +elements.currentValue.innerText;
  const operator = info.currentOperator;
  const result = f(operator)(a, b);

  return isNum(result) ? result : 'Math error';
}

function deleteInput() {
  elements.currentValue.innerText = elements.currentValue.innerText.slice(0, -1);
  if (elements.currentValue.innerText.length === 0) 
    elements.currentValue.innerText = '0';
}

function clear() {
  info.currentOperator = info.previousValue = '';
  elements.equation.innerText = '';
  elements.currentValue.innerText = '0';
}

function toggleSign() {
  elements.currentValue.innerText = -1 * (+elements.currentValue.innerText);
}

function addPoint() {
  if (elements.currentValue.innerText.includes('.')) return;
  elements.currentValue.innerText += '.';
}

const isNum = num => !(isNaN(num) && isNum(parseFloat(num)));