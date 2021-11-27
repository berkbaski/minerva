export type CheckListResult = {
    checkListItems: CheckListItem[];
    startDate: Date;
    finishDate?: Date;
};

export type CheckListItem = {
    question: string;
    value: boolean;
};

export enum Commands {
    INIT = 'init',
    SHOW = 'show',
    HELP = 'help',
    DEFAULT = 'default'
}
