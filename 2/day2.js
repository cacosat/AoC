// input is the info of several games; format of input: 
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game [ID]: [cubes shown]; [cubes shown]; ...

// Part 1: figure out what games are possible with
// 12 red, 13 green, 14 blue; and sum it's indices

// modules 
const fs = require('fs');
const path = require('path');

function importTestCases(fileName) {
    /*
    use path to get path to directory (__dirname)
    retrieve test cases with fs and split into array
    return test cases
    */
    const filePath = path.resolve(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    const testCases = data.split(/\r?\n/);
    console.log(testCases);
    return testCases;
}

importTestCases('test.txt')