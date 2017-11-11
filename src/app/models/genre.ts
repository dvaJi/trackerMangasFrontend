export default class Genre {

    static generateMockGenres(): Genre[] {
        return [
            {
                id: 1,
                name: 'Comedia',
                id_series: 1,
                id_typegenres: 1
            },
            {
                id: 2,
                name: 'Drama',
                id_series: 1,
                id_typegenres: 2
            },
            {
                id: 3,
                name: 'Romance',
                id_series: 1,
                id_typegenres: 3
            }
        ];
    }

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
