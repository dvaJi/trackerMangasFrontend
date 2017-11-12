export default class SerieRanking {

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
