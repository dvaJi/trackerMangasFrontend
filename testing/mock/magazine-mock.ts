import Magazine from '../../src/app/models/magazine';

export class MagazineMock {

    static generateMockMagazine(): Magazine {
        return {
            id: 1,
            name: 'Jump SQ',
            native_name: 'ジャンプスクエア',
            id_publisher: 1,
            description: '',
            uniqid: '87622385',
            stub: 'jump_sq',
            release_schedule: 'Mensual',
            circulation: new Date('2007-10-02'),
            website: null,
            twitter: null,
            created: new Date,
            updated: new Date
        };
    }

    static generateMockMagazines(): Magazine[] {
        return [
            {
                id: 1,
                name: 'Jump SQ',
                native_name: 'ジャンプスクエア',
                id_publisher: 1,
                description: '',
                uniqid: '87622385',
                stub: 'jump_sq',
                release_schedule: 'Mensual',
                circulation: new Date('2007-10-02'),
                website: null,
                twitter: null,
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                name: 'Bessatsu Shounen Champion',
                native_name: '別冊少年チャンピオン',
                id_publisher: 2,
                description: '',
                uniqid: '59ebd770e0660',
                stub: 'bessatsu_shounen_champion',
                release_schedule: 'Mensual',
                circulation: new Date('2012-06-12'),
                website: 'http://www.akitashoten.co.jp/b-champion',
                twitter: null,
                created: new Date,
                updated: new Date
            }
        ];
    }
}
