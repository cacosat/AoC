const fs = require('fs');
const path = require('path');

function importTestCases(filenameStr) {
    const filePath = path.join(__dirname, filenameStr);
    const data = fs.readFileSync(filePath, 'utf-8');
    const testCasesByLine = data.split('\n');
    return testCasesByLine;
}


function trebuchet(inputStr) { // combine first and last digit
    let sumOfElements = '';
    let totalSum = 0;

    let strArray = inputStr.split('');
    // filter array for numbers
    // let initialValue = '';
    let strArrayFiltered = strArray.filter((item, index) => !isNaN(item));
    if (strArrayFiltered.length <= 2) {
        sumOfElements = strArrayFiltered.reduce((acumulator, current) => acumulator + current);
        totalSum += +sumOfElements;
    } else {
        sumOfElements = strArrayFiltered.slice(0, 2).reduce((acumulator, current) => acumulator + current);
        totalSum += +sumOfElements;
    }

    // console.log('Start ------------------------------');
    // console.log('Input: ' + inputStr);
    // console.log('strArray: ' + strArray);
    // console.log('Filtered: ' + strArrayFiltered);
    // console.log('result -> ' + sumOfElements)
    // console.log('');

    return +sumOfElements;
}

const testCases = importTestCases('test.txt');
let total = 0;

testCases.forEach(element => {
    total += trebuchet(element);
    console.log('total ' + total + '; ' + trebuchet(element) + ' -> ' + element);
});
console.log(total);