const fs = require('fs');
const path = require('path');

function importTestCases(filenameStr) {
    const filePath = path.join(__dirname, filenameStr);
    const data = fs.readFileSync(filePath, 'utf-8');
    // windows uses \r\n to mark end of lines, macos and unix use \n;
    // regex /\r?\n/ is used to match \r as optional and match \n
    const testCasesByLine = data.split(/\r?\n/); 
    return testCasesByLine;
}

function trebuchet(input) {
    let totalSum = 0;
    let inputStrNums = [];

    for (let i = 0; i < input.length; i++) {
        let inputStrArray = input[i].split('');
        let nums = [];
        let inputCalibrationValue = ''; // calibration value for each string

        inputStrArray.forEach((char) => !isNaN(char) ? nums.push(char) : ''); // add char to nums if char is num
        
        console.log(`nums array for iteration ${i}: ${nums}`)

        if (nums.length > 2) {
            // retrieve first and last index
            inputCalibrationValue = nums[0] + nums[nums.length - 1];
        } else if (nums.length === 1) {
            // resulting num must be 2 digits, if theres only one it's the same digit twice
            inputCalibrationValue = nums[0] + nums[0];
        } else {
            // nums.length === 0 || 2; concatenate all and push to inputStrNums
            nums.forEach(num => inputCalibrationValue += num);
        }

        inputStrNums.push(inputCalibrationValue);
    }
    
    console.log(`nums registered from array: ${inputStrNums}`);
    console.log(`nums length: ${inputStrNums.length}`);

    totalSum = inputStrNums.reduce((accumulator, current) => accumulator + +current, 0)

    console.log(`total sum: ${totalSum}`)
}


const testCases = importTestCases('test.txt');
let total = 0;

trebuchet(testCases);
























// function trebuchet(inputStr) { // combine first and last digit
//     let sumOfElements = '';
//     let totalSum = 0;

//     let strArray = inputStr.split('');
//     // filter array for numbers
//     // let initialValue = '';
//     let strArrayFiltered = strArray.filter((item, index) => !isNaN(item));
//     if (strArrayFiltered.length <= 2) {
//         sumOfElements = strArrayFiltered.reduce((acumulator, current) => acumulator + current);
//         totalSum += +sumOfElements;
//     } else {
//         sumOfElements = strArrayFiltered.slice(0, 2).reduce((acumulator, current) => acumulator + current);
//         totalSum += +sumOfElements;
//     }

//     // console.log('Start ------------------------------');
//     // console.log('Input: ' + inputStr);
//     // console.log('strArray: ' + strArray);
//     // console.log('Filtered: ' + strArrayFiltered);
//     // console.log('result -> ' + sumOfElements)
//     // console.log('');

//     return +sumOfElements;
// }
