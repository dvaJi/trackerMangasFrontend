export default class SerieRanking {

    static generateObjectMockSerieRanking(): SerieRanking {
        return {
            id: 1,
            id_series: 1,
            id_user: 1,
            ranking: 5,
            created: new Date,
            updated: new Date
        };
    }

    static generateArrayMockSerieRanking(): SerieRanking[] {
        return [
            {
                id: 1,
                id_series: 1,
                id_user: 1,
                ranking: 5,
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                id_series: 1,
                id_user: 2,
                ranking: 5,
                created: new Date,
                updated: new Date
            }
        ];
    }

    id: number;
    id_series: number;
    id_user: number;
    ranking: number;
    created: Date;
    updated: Date;

    constructor() {
        this.id = 0;
        this.id_series = 0;
        this.id_user = 0;
        this.ranking = 0;
        this.created = new Date;
        this.updated = new Date;
    }
}
