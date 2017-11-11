export class Answers {

    static generateMockAnswers(): Answers[] {
        return [
            { id: 1, answer: 'Dunno', votes: 0 },
            { id: 2, answer: 'Maybe', votes: 1 }
        ];
    }

    id: number;
    answer: string;
    votes: number;

    constructor() {
        this.id = 0;
        this.answer = '';
        this.votes = 0;
    }
}

export default class Poll {

    static generateMockPolls(): Poll[] {
        return [
            {
                id: 1,
                title: 'First Poll',
                description: 'The first Poll',
                question: 'Why?',
                active: true,
                totalVotes: 1,
                answers: Answers.generateMockAnswers()
            },
            {
                id: 2,
                title: 'Second Poll',
                description: 'The SeconD Poll',
                question: 'Nani?!',
                active: true,
                totalVotes: 1,
                answers: Answers.generateMockAnswers()
            }
        ];
    }

    static generateMockPoll(): Poll {
        return {
            id: 2,
            title: 'Second Poll',
            description: 'The SeconD Poll',
            question: 'Nani?!',
            active: true,
            totalVotes: 1,
            answers: Answers.generateMockAnswers()
        };
    }

    id: number;
    title: string;
    question: string;
    description: string;
    answers: Array<Answers>;
    active: boolean;
    totalVotes: number;
    answered?: boolean;

    constructor() {
        this.id = 0;
        this.title = '';
        this.question = '';
        this.description = '';
        this.answers = [];
        this.active = false;
        this.totalVotes = 0;
    }
}
