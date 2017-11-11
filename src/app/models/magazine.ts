export default class Magazine {

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

    id: number;
    name: string;
    native_name: string;
    id_publisher: number;
    description: string;
    uniqid: string;
    stub: string;
    release_schedule: string;
    circulation: Date;
    website: string;
    twitter: string;
    created: Date;
    updated: Date;

    constructor() {
        this.id = 0;
        this.name = '';
        this.native_name = '';
        this.id_publisher = 0;
        this.description = '';
        this.uniqid = '';
        this.stub = '';
        this.release_schedule = '';
        this.circulation = new Date;
        this.website = '';
        this.twitter = '';
        this.created = new Date;
        this.updated = new Date;
    }
}
