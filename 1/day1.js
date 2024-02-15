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

function spelledNumToNum (arrayOfStr) {
    let allNumArray = [];
    const numMap = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    }

    arrayOfStr.forEach((str, index) => {
        if (typeof str === 'string' && isNaN(str)) {
            // str is string and not a num, ex: 'one', 'two', etc
            allNumArray.push(numMap[str]);
        } else {
            allNumArray.push(str);
        }
    })

    return allNumArray;
}

function trebuchet(input) {
    let totalSum = 0;
    let inputStrNums = [];
    // regex for detecting integers (\d) or spelled out nums, 
    // also with flag g (global search so it doesn't returns just the 1st) and i (case insensitive)
    let regex = /\d|(one|two|three|four|five|six|seven|eight|nine)/gi

    for (let i = 0; i < input.length; i++) {
        // let inputStrArray = input[i].split(''); // deprecated for part 2
        let nums = [];
        let inputCalibrationValue = ''; // calibration value for each string

        // inputStrArray.forEach((char) => !isNaN(char) ? nums.push(char) : ''); // deprecated for part 2
        nums = input[i].match(regex);
        
        // convert spelled out nums to str nums
        nums = spelledNumToNum(nums);
        
        console.log(`nums array for iteration ${i}: ${nums}`)

        if (nums.length > 2) {
            // retrieve first and last index
            inputCalibrationValue = nums[0] + nums[nums.length - 1];
        } else if (nums.length === 1) {
            // resulting num must be 2 digits, if theres only one it's the same digit
            inputCalibrationValue = nums[0] + nums[0];
        } else {
            // nums.length === 0 || 2; concatenate all and push to inputStrNums
            nums.forEach(num => inputCalibrationValue += num);
        }
        console.log(`calibration value for i=${i} -> ${inputCalibrationValue}`)
        inputStrNums.push(inputCalibrationValue);
    }

    totalSum = inputStrNums.reduce((accumulator, current) => {
        console.log(`accumulator = ${accumulator} / current = ${current}`)
        return accumulator + +current
    }, 0)

    console.log(`total sum: ${totalSum}`)
}


const testCases = importTestCases('test.txt');

trebuchet(testCases);