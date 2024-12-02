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
    var safeReportCount = 0;
    for (let i=0; i<lines.length; i++) {
        var tokens = lines[i].split(' ');
        tokens = tokens.map(Number);
        if (isReportSafe(tokens)) {
            safeReportCount++;
        }
    }
    return safeReportCount;
}

function isReportSafe(tokens) {
    var isUnsafeReport = false;
    var isAscending = false, isDescending = false;
    for(let j=0; j<tokens.length-1; j++) {
        var diff = Math.abs(tokens[j] - tokens[j+1]);
        if (diff < 1 || diff > 3) {
            isUnsafeReport = true;
            break;
        }
        if (j === 0) {
            if (tokens[j] > tokens[j+1]) {
                isDescending = true;
            } else {
                isAscending = true;
            }
        } else {
            if (isAscending && tokens[j+1] < tokens[j]) {
                isUnsafeReport = true;
                break;
            } else if (isDescending && tokens[j+1] > tokens[j]) {
                isUnsafeReport = true;
                break;
            }
        }
    }
    return !isUnsafeReport;
}

function getArraysWithOneElementRemoved(array) { 
    let result = []; for (let i = 0; i < array.length; i++) { 
        let newArray = array.slice(0, i).concat(array.slice(i + 1)); 
        result.push(newArray); 
    } 
    return result;
}

async function part2(dayNum) {
    const data = await loadInput(dayNum);
    const lines = data.split('\n');
    var safeReportCount = 0;
    for (let i=0; i<lines.length; i++) {
        var tokens = lines[i].split(' ');
        tokens = tokens.map(Number);
        if (isReportSafe(tokens)) {
            safeReportCount++;
        } else {
            var arrays = getArraysWithOneElementRemoved(tokens);
            for(let j=0; j<arrays.length; j++) {
                if (isReportSafe(arrays[j])) {
                    safeReportCount++;
                    break;
                }
            }
        }
    }
    return safeReportCount;
}

const filereader = require('../utils/fileread.js');

async function loadInput(dayNum) {
    const text = await filereader.readTextFile(dayNum);
    return text;
}