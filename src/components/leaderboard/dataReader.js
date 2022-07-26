import React from 'react';
import Papa from 'papaparse';
import { dbGet, dbPut } from '../../utils/dbFetcher';

const parseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimiter: ",",
};

async function getData() {
    let data = await dbGet('scores');
    const new_data = data.map(playerInfo => {
        return {
            name: playerInfo[0],
            correctAnswers: playerInfo[1],
            incorrectAnswers: playerInfo[2],
        }
    })
    return new_data;
}

export async function addNewScore(score, answerLog) {
    let data = {
        "result": score ? [score.name, score.correct.toString(), score.incorrect.toString()] : null,
        "log": answerLog
    }
    await dbPut('scores', data);
}

export default getData;
