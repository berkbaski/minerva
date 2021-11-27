import { exec } from 'child_process';
import fs from 'fs';
import { CONFIG_FILE, PROJECT_DIRECTORY } from '../const';

export function initConfig() {
    createConfigFile();
    // createHuskyHooks(); TODO: Test before commit.
}

/**
 * Checks if `minerva` is initialized in the project.
 */
export function configFileIsExists(): boolean {
    return fs.readdirSync(PROJECT_DIRECTORY).includes(CONFIG_FILE);
}

/**
 * Returns checklist items of the project.
 * @returns checklist items
 */
export function readConfigFile(): string[] {
    const fileIsExists = configFileIsExists();
    if (!fileIsExists) {
        throw new Error('Config file is not exists!');
    }

    const data = String(fs.readFileSync(`${PROJECT_DIRECTORY}/${CONFIG_FILE}`));
    return JSON.parse(data);
}

/**
 * Creates checklist items for the project.
 * @param checklist checklist items
 */
export function createConfigFile(checklist: string[] = []) {
    const fileIsExists = configFileIsExists();
    if (fileIsExists) {
        throw new Error('Config file is exists!');
    }

    const data = JSON.stringify(checklist);

    fs.writeFileSync(`${PROJECT_DIRECTORY}/${CONFIG_FILE}`, data);
}

/**
 * Adds `husky` hooks to the project
 */
export function createHuskyHooks() {
    exec(`npx husky install && npx husky add .husky/pre-commit "npx minerva --show"`, (err, out) => {
        if (err) {
            throw err;
        }

        console.info('Minerva: Initialized!\n');
    });
}
