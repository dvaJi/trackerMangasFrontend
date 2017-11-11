export default class News {

    static generateMockNews(): News {
        return {
            id: 1,
            title: 'Fake news',
            stub: 'fake_news',
            content: 'This is a fake news.',
            user: 'io',
            created: new Date(),
            updated: new Date()
        };
    }

    static generateArrayMockNews(): News[] {
        return [
            {
                id: 1,
                title: 'Fake news',
                stub: 'fake_news',
                content: 'This is a fake news.',
                user: 'io',
                created: new Date(),
                updated: new Date()
            },
            {
                id: 2,
                title: 'Real Fake news',
                stub: 'real_fake_news',
                content: 'This is a f**ng real fake news.',
                user: 'ionop',
                created: new Date(),
                updated: new Date()
            }
        ];
    }

    id: number;
    title: string;
    stub: string;
    content: string;
    user: string;
    created: Date;
    updated: Date;

    constructor() {
        this.id = 0;
        this.title = '';
        this.stub = '';
        this.content = '';
        this.user = '';
        this.created = new Date;
        this.updated = new Date;
    }
}
