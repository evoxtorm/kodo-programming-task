// import { json } from 'express';
import { readFile } from 'fs/promises';

async function getData(path) {
    let data = []
    try {
        let rawData = await readFile(path, "utf8");
        data = await JSON.parse(rawData);
        return data;
    } catch (error) {
        console.log(`Their is a error reading the data file : ${error}`)
    }
    return data;
}

 export default async function readDataFile(path) {
    let finalJsonData = await getData(path);
    return finalJsonData;
}