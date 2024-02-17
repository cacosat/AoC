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
    gamesArray.forEach((gameStr, index) => {git 
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
    // console.log(gamesObj)
    return gamesObj;
}

gamesArrayToGamesObj(testCases);

function possibleGames(currentCubes, limit) {
    let games = [];
    let idSum = 0;
    // determine possible games given the cubesInBag
    // Add up the ID's of the possible games

    let gamesObj = gamesArrayToGamesObj(testCases);

    Object.keys(gamesObj).forEach((key) => {
        // check if each obj (game) surpases limit, then if they do take it out
        if (gamesObj[key].hasOwnProperty('red') && limit.hasOwnProperty('red')) {
            if (gamesObj[key]['red'] > limit['red'] && 
                gamesObj[key]['green'] > limit['green'] &&
                gamesObj[key]['blue'] > limit['blue']) {
                games.push({[key]: gamesObj[key]})
                idSum += +key;
            }
        }
    });

    console.log(games);
    console.log(idSum)

    return [games, idSum];
};

possibleGames(testCases, cubesInBag);