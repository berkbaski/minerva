import { prompt } from 'enquirer';
import fs from 'fs';
import { readConfigFile } from './config';
import { CheckListResult } from '../types';
import { LOGS_DIRECTORY, LOG_FILE, PROJECT_DIRECTORY } from '../const';

/**
 * Show the checklist.
 */
export async function showCheckList() {
    const checkList = readConfigFile();
    console.info('minervaChecklist: ', checkList);
    if (!checkList.length) {
        console.info('Minerva: There is no check list item!\n');
        return;
    }

    const result: CheckListResult = { checkListItems: [], startDate: new Date() };

    let index = 0;
    for (let item of checkList) {
        const value = await showCheckListItem(`question${index + 1}`, item);
        result.checkListItems?.push({ question: item, value });
        index++;
    }

    result.finishDate = new Date();

    const successItemLength = result.checkListItems.filter((i) => i.value).length;
    if (successItemLength === result.checkListItems.length) {
        console.info(`Minerva: Congrats! You passed all (${result.checkListItems?.length}) items\n`);
    } else {
        console.error(`Minerva: Upps! ${successItemLength} success, ${result.checkListItems.length - successItemLength} failed\n`);
    }

    saveCheckListResult(result);
}

/**
 * Show prompt with a given question
 * @param message Asked question.
 * @returns Return value of prompt.
 */
export async function showCheckListItem(name: string, message: string) {
    return new Promise<boolean>((resolve, reject) => {
        prompt({ type: 'confirm', name, message })
            .then((value) => resolve(Boolean(value)))
            .catch(reject);
    });
}

/**
 * Save log into `.minerva-logs` folder.
 * @param result Checklist to log.
 */
export function saveCheckListResult(result: CheckListResult) {
    const logsDirectoryIsExists = fs.readdirSync(PROJECT_DIRECTORY).includes(LOGS_DIRECTORY);
    if (!logsDirectoryIsExists) {
        fs.mkdirSync(`${PROJECT_DIRECTORY}/${LOGS_DIRECTORY}`);
    }

    const data = JSON.stringify(result, null, 2);
    fs.writeFileSync(`${PROJECT_DIRECTORY}/${LOGS_DIRECTORY}/${LOG_FILE.replace('__date__', result.startDate?.toString())}.json`, data);
}
