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
    // console.log(`gamesObj shown below:`);
    // console.log(gamesObj);
    return gamesObj;
}

function possibleGames(currentCubes, limit) {
    let games = [];
    let idSum = 0;
    // determine possible games given the cubesInBag
    // Add up the ID's of the possible games

    let gamesObj = gamesArrayToGamesObj(currentCubes);

    for (let gameId in gamesObj) { // iterates over games
        let skipGameId = false;
        for (let set in gamesObj[gameId]) { // iterates over sets for each gameId
            // check if each game set (gamesObj[gameId][set] === set) surpases limit[color]

            // console.log(`red cubes for ${gameId} (set ${set}) -> ${gamesObj[gameId][set]['red']}, red limit -> ${limit['red']}`);
            // console.log(`${gamesObj[gameId][set]['red'] < limit['red'] &&
            // gamesObj[gameId][set]['green'] < limit['green'] &&
            // gamesObj[gameId][set]['blue'] < limit['blue']}`)
            // console.log(`green cubes for ${gameId} (set ${set}) -> ${gamesObj[gameId][set]['green']}, green limit -> ${limit['green']}`);
            // console.log(`${gamesObj[gameId][set]['red'] < limit['red'] &&
            // gamesObj[gameId][set]['green'] < limit['green'] &&
            // gamesObj[gameId][set]['blue'] < limit['blue']}`)
            // console.log(`blue cubes for ${gameId} (set ${set}) -> ${gamesObj[gameId][set]['blue']}, blue limit -> ${limit['blue']}`);
            // console.log(`${gamesObj[gameId][set]['red'] < limit['red'] &&
            // gamesObj[gameId][set]['green'] < limit['green'] &&
            // gamesObj[gameId][set]['blue'] < limit['blue']}`)

            if (!(gamesObj[gameId][set]['red'] <= limit['red'] &&
                gamesObj[gameId][set]['green'] <= limit['green'] &&
                gamesObj[gameId][set]['blue'] <= limit['blue'])) {
                    delete gamesObj[gameId];
                    skipGameId = true;
                    break;
                    // console.log(`admissible ${gameId}`)
                    // console.log(gamesObj[gameId]);
                };
        };
        if (skipGameId) {
            continue;
        }
    };
    idSum = Object.keys(gamesObj).reduce((accumulator, currentId) => accumulator + +currentId, idSum)
    return [gamesObj, idSum]; // games is array with possible games, and idSum their ids summed
};

let [possibleGamesObj, totalSumPossibleGamesIds] = possibleGames(testCases, cubesInBag);
console.log(Object.keys(possibleGamesObj))
console.log(totalSumPossibleGamesIds)