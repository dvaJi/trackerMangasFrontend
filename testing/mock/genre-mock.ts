import { Genre } from '@app/models';

export class GenreMock {

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
}
