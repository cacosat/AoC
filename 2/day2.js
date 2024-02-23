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
    let gamesObj = {}; // resulting value of converting array of games into an object

    gamesArray.forEach((gameStr, index) => {
        let gameId = gameStr.match(/\d+/)[0];
        let setsPerGameStr = gameStr.split(': ')[1].split('; '); // array of sets for each game (cubes shown each set separated by comma)
        setsPerGameStr.forEach((set, index) => {
            // each set needs to be checked against the limit (cubesInBag),
            // but first needs to be formated to compare it
            let currentSet = set;
            let currentSetCubes = {red: 0, green: 0, blue: 0};
            // parse strings and use currentSetCubes as counter for the cubes count
            if (set.includes(',')){
                // more than one cube within the set
                currentSet = set.split(', ');
                currentSet.forEach((cube) => {
                    if (cube.includes('red')) {
                        let numStrOfCube = cube.match(/\d+/)[0];
                        currentSetCubes['red'] = numStrOfCube;
                    } else if (cube.includes('green')) {
                        let numStrOfCube = cube.match(/\d+/)[0];
                        currentSetCubes['green'] = numStrOfCube;
                    } else if (cube.includes('blue')) {
                        let numStrOfCube = cube.match(/\d+/)[0];
                        currentSetCubes['blue'] = numStrOfCube;
                    }
                });
            } else {
                let numStrOfCube = currentSet.match(/\d+/)[0];
                let color = currentSet.match(/(red|green|blue)/)[0];
                currentSetCubes[color] = numStrOfCube;
            }
            // add each set counter to gamesObj[gameId]
            if (!gamesObj[gameId]) {
                gamesObj[gameId] = {}
            }
            gamesObj[gameId][index] = currentSetCubes
        });
    });
    console.log(`gamesObj shown below:`);
    console.log(gamesObj);
    return gamesObj;
}

function possibleGames(currentCubes, limit) {
    let games = [];
    let idSum = 0;
    // determine possible games given the cubesInBag
    // Add up the ID's of the possible games

    let gamesObj = gamesArrayToGamesObj(currentCubes);
    // gamesObj is of the following structure:
    // {
    //     game1: {
    //       nSets: { red: numStr | 0, green: numStr | 0, blue: numStr | 0 }
    //     },
    //     gameN: {...}
    // }

    Object.keys(gamesObj).forEach((gameId) => {
        // check if each game set gamesObj[gameId][set] surpases limit, then take it out

        // TODO -> evaluate each set SEPARATELY

    });

    return [games, idSum]; // games is array with possible games, and idSum their ids summed
};

possibleGames(testCases, cubesInBag);