import { SerieRanking } from '@app/models';

export class SerieRankingMock {

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
}
