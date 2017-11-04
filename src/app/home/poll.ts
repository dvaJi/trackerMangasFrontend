export class Poll {
    id: number;
    title: string;
    question: string;
    description: string;
    answers: Array<Answers>;
    active: boolean;
    totalVotes: number;
    answered?: boolean;
}

export class Answers {
    id: number;
    answer: string;
    votes: number;
}
