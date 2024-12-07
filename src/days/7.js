module.exports.run = async (dayNum, part) => {
    part = +part;
    dayNum = +dayNum;
    if (part === 1) {
        return part1(dayNum);
    } else {
        return part2(dayNum);
    }
};

async function part1(dayNum) {
    const data = await loadInput(dayNum);
    const lines = data.split('\n');
    var totalCalibrationResult = 0;
    for(let i=0; i<lines.length; i++) {
        const tokens = lines[i].split(': ');
        const toSum = +(tokens[0]);
        const numbers = tokens[1].split(' ').map(Number);
        if (operate(toSum, 0, numbers)) {
            totalCalibrationResult += toSum;
        }
    }
    return totalCalibrationResult;
}

const operate = (toSum, sumSoFar, tokens, isPartTwo = false) => {
    var tokensInThisOperation = tokens.slice(); 
    var thisToken = tokensInThisOperation.shift();
    var validOperations = false;
    var typeOfOperations = 2;
    if (isPartTwo) {
        typeOfOperations = 3;
    }
    for (let i=0; i<typeOfOperations; i++) {
        if (validOperations) {
            return true;
        }
        var sumSoFarWithThisToken = sumSoFar;
        if (sumSoFarWithThisToken === 0) {
            i++;
            sumSoFarWithThisToken = thisToken;
        } else if (i === 0) {
            sumSoFarWithThisToken += thisToken; 
        } else if (i === 1) {
            sumSoFarWithThisToken *= thisToken;
        } else {
            sumSoFarWithThisToken = +(sumSoFarWithThisToken + '' + thisToken);
        }
        if (tokensInThisOperation.length === 0) {
            if (toSum === sumSoFarWithThisToken) {
                validOperations = true;
            } else {
                validOperations = false;
            }
        } else {
            validOperations = operate(toSum, sumSoFarWithThisToken, tokensInThisOperation, isPartTwo);
        }
    }
    return validOperations;
};

async function part2(dayNum) {
    const data = await loadInput(dayNum);
    const lines = data.split('\n');
    var totalCalibrationResult = 0;
    for(let i=0; i<lines.length; i++) {
        const tokens = lines[i].split(': ');
        const toSum = +(tokens[0]);
        const numbers = tokens[1].split(' ').map(Number);
        if (operate(toSum, 0, numbers, true)) {
            totalCalibrationResult += toSum;
        }
    }
    return totalCalibrationResult;
}

const filereader = require('../utils/fileread.js');

async function loadInput(dayNum) {
    const text = await filereader.readTextFile(dayNum);
    return text;
}