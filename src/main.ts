import minimist from 'minimist';
import { showCheckList } from './lib/check';
import { initConfig } from './lib/config';
import help from './lib/help';
import { Commands } from './types';

try {
    const argv = minimist(process.argv.slice(2));

    const commandIsExists = Object.keys(argv).filter((c) => c !== '_').length > 0;
    if (commandIsExists) {
        const defaultCommand = { command: Commands.DEFAULT, function: () => console.error('Minerva: Undefined command!\n') };
        const selectedCommand =
            [
                { command: Commands.INIT, function: initConfig },
                { command: Commands.SHOW, function: showCheckList },
                { command: Commands.HELP, function: help }
            ].find((c) => argv[c.command]) || defaultCommand;

        selectedCommand.function();
    } else {
        help();
    }
} catch (e) {
    console.error('Minerva: an error has occured :/\n', e);
}
