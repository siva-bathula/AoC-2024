const fs = require("fs");

module.exports.readJSONFile = async (day) => {
    try {
        const data = fs.readFileSync(`./src/input/${day}.txt`, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${day}: ${error}`);
        return [];
    }
}

module.exports.readTextFile = async (day) => {
    const data = fs.readFileSync(`./src/input/${day}.txt`, 'utf8');
    return data;
}