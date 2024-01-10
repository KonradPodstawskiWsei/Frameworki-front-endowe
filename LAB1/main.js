const sumOutput = document.querySelector('#sum');
const avgOutput = document.querySelector('#avg');
const minOutput = document.querySelector('#min');
const maxOutput = document.querySelector('#max');

const addInput = document.querySelector('#addInput');
const removeInput = document.querySelector('#removeInput');

const numbers = document.querySelectorAll('.number');
let values = [];

numbers.forEach((number) => {
    number.addEventListener('change', () => {
        getNumbersValue();
        allMethods();
    });
});

const sumFunc = () => {
    const sum = values.reduce((a, b) => a + b, 0);
    sumOutput.innerHTML = sum;
}

const avgFunc = () => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    avgOutput.innerHTML = avg;
}

const minFunc = () => {
    const min = Math.min(...values);
    minOutput.innerHTML = min;
}

const maxFunc = () => {
    const max = Math.max(...values);
    maxOutput.innerHTML = max;
}

const allMethods = () => {
    sumFunc();
    avgFunc();
    minFunc();
    maxFunc();
}

const getNumbersValue = () => {
    values = [];
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach((number) => {
        values.push(parseFloat(number.value));
    });
}

const newInput = () => {
    const input = document.createElement('input');
    input.classList.add('number');
    input.type = 'number';
    input.value = 0;
    input.addEventListener('change', () => {
        getNumbersValue();
        allMethods();
    });
    document.querySelector('#numbers-container').appendChild(input);
}

const removeLastInput = () => {
    const inputs = document.querySelectorAll('.number');
    inputs[inputs.length - 1].remove();
    getNumbersValue();
    allMethods();
}