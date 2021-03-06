export class Answers {

    id: number;
    answer: string;
    votes: number;

    static generateMockAnswers(): Answers[] {
        return [
            { id: 1, answer: 'Dunno', votes: 0 },
            { id: 2, answer: 'Maybe', votes: 1 }
        ];
    }

    constructor() {
        this.id = 0;
        this.answer = '';
        this.votes = 0;
    }
}

export class Poll {

    id: number;
    title: string;
    question: string;
    description: string;
    answers: Array<Answers>;
    active: boolean;
    totalVotes: number;
    answered?: boolean;

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
