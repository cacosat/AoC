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
        let setsPerGameStr = gameStr.split(': ')[1].split('; '); // array of sets for each game (cubes shown)
        setsPerGameStr.forEach((set, index) => {
            // each set needs to be checked against the limit (cubesInBag),
            // but first needs to be formated to compare it
            let currentSetCubes = {red: 0, blue: 0, green: 0};


            if (!gamesObj[gameId]) {
                gamesObj[gameId] = {}
            }
            const cubesPerSet = set.split(', ');

            if (set.includes('red') && set.includes('green') && set.includes('blue')) {
                gamesObj[gameId][index] = {red: 1}
            }

            // gamesObj[gameId][index] = cubesPerSet;
            console.log(`set index = ${index} / set = ${set}`)
            // cubesPerSet.forEach((cube) => {

            //     console.log(`set = ${set}; cubesperset = ${cubesPerSet}; currentCube = ${cube}; id = ${gameId}`)
                
            //     // if (cube.includes('red')) {
            //     //     gamesObj[gameId] += 0;
            //     // } else if (cube.includes('green')) {
            //     //     gamesObj[gameId] += 0;
            //     // } else if (cube.includes('blue')) {
            //     //     gamesObj[gameId] += 0;
            //     // }
            // });
        });
    });
    console.log(`gamesObj`)
    console.log(gamesObj)
    return gamesObj;
}

function possibleGames(currentCubes, limit) {
    let games = [];
    let idSum = 0;
    // determine possible games given the cubesInBag
    // Add up the ID's of the possible games

    let gamesObj = gamesArrayToGamesObj(currentCubes);

    Object.keys(gamesObj).forEach((gameId) => {
        // check if each obj (game) surpases limit, then take it out

        // TODO -> fix evaluating each set SEPARATELY

        // console.log('\n');
        // console.log('gameId: ' + gameId);
        // console.log(`color red for gameId ${gameId} = ${gamesObj[gameId]['red']}`);
        // console.log(`limit for color red = ${limit['red']}`);
        if ((gamesObj[gameId]['red'] < limit['red']) &&
            (gamesObj[gameId]['green'] < limit['green']) &&
            (gamesObj[gameId]['blue'] < limit['blue'])) {
            games.push({[gameId]: gamesObj[gameId]})
            idSum += +gameId;
        } 
    });

    // console.log('');
    // console.log(games);
    // console.log(`total sum = ${idSum}`)

    return [games, idSum];
};

possibleGames(testCases, cubesInBag);