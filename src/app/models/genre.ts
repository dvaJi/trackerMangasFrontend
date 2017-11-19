export default class Genre {

    id: number;
    name: string;
    id_series: number;
    id_typegenres: number;
    checked?: boolean;

    constructor() {
        this.id = 0;
        this.name = '';
        this.id_series = 0;
        this.id_typegenres = 0;
    }
}
