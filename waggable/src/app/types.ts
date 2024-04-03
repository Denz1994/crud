
export interface question {
    id: number;
    prompt: string;
    correctAnswer: string;
    selectedChoice: null | string;
    choices: string[];
};
