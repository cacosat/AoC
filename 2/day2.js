// input is the info of several games; format of input: 
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game [ID]: [cubes shown]; [cubes shown]; ...

// Part 1: figure out what games are possible with
// 12 red, 13 green, 14 blue; and sum it's indices

const fs = require('fs');
const path = require('path');

const cubesInBag = {'red': 12, 'green': 13, 'blue': 14}

function importTestCases(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    const testCases = data.split(/\r?\n/);

    return testCases;
}

const testCases = importTestCases('test.txt');

function gamesArrayToGamesObj(gamesArray) {
    let gamesObj = {}; // {id: {red: X, green: X, blue: X}, ...}
    gamesArray.forEach((gameStr, index) => {
        let currentId = index + 1;
        gamesObj[currentId] = {red: 0, green: 0, blue: 0}
        let cubes = gameStr.split(':')[1].split(';'); // array of cubes shown each game
        cubes.forEach((cubeRound) => {
            const singleCubesArray = cubeRound.split(',');
            singleCubesArray.forEach((cube) => {
                if (cube.includes('red')) {
                    gamesObj[currentId].red += parseInt(cube)
                } else if (cube.includes('green')) {
                    gamesObj[currentId].green += parseInt(cube)
                } else if (cube.includes('blue')) {
                    gamesObj[currentId].blue += parseInt(cube)
                }
            });
        });
    });
    console.log(gamesObj)
    return gamesObj;
}

function possibleGames(currentCubes, limit) {
    let games = [];
    let idSum = 0;
    // determine possible games given the cubesInBag
    // Add up the ID's of the possible games

    let gamesObj = gamesArrayToGamesObj(currentCubes);
    // {
    //     '1': { red: 5, green: 4, blue: 9 },
    //     '2': { red: 1, green: 6, blue: 6 },
    //     '3': { red: 25, green: 26, blue: 11 },
    //     '4': { red: 23, green: 7, blue: 21 },
    //     '5': { red: 7, green: 5, blue: 3 }
    // }

    Object.keys(gamesObj).forEach((key) => {
        // check if each obj (game) surpases limit, then if they do take it out
        console.log('\n');
        console.log('key: ' + key);
        console.log(`color red for key ${key} = ${gamesObj[key]['red']}`);
        console.log(`limit for color red = ${limit['red']}`);
        console.log(gamesObj[key]['red'] > limit['red'] );
        if ((gamesObj[key]['red'] > limit['red']) &&
            (gamesObj[key]['green'] > limit['green']) &&
            (gamesObj[key]['blue'] > limit['blue'])) {
            games.push({[key]: gamesObj[key]})
            idSum += +key;
        } 
    });

    console.log(games);
    console.log(`total sum = ${idSum}`)

    return [games, idSum];
};

possibleGames(testCases, cubesInBag);