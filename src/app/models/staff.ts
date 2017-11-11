import Serie from './serie';
import Cover from './cover';

export default class Staff {

    static generateObjectMockStaff(): Staff {
        return {
            id: 1,
            name: 'Kirioka Sana',
            names: ['桐丘さな'],
            stub: 'kirioka_sana',
            uniqid: '90asdf62a',
            cover: Cover.generateMockCover(),
            description: 'Autor de...',
            gender: 0,
            website: null,
            facebook: null,
            twitter: 'sana_kirioka',
            pixiv: null,
            blood_type: 0,
            birth_date: null,
            birsth_place: null,
            created: new Date,
            updated: new Date
        };
    }

    static generateArrayMockStaffs(): Staff[] {
        return [
            {
                id: 1,
                name: 'Kirioka Sana',
                names: ['桐丘さな'],
                stub: 'kirioka_sana',
                uniqid: '90asdf62a',
                cover: Cover.generateMockCover(),
                description: 'Autor de...',
                gender: 0,
                website: null,
                facebook: null,
                twitter: 'sana_kirioka',
                pixiv: null,
                blood_type: 0,
                birth_date: null,
                birsth_place: null,
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                name: 'FLIPFLOPs',
                names: ['FLIPFLOPs (高畑ゆき)', 'FLIPFLOPs (TAKAHATA Yuki)', 'FRIPFROPs', '高畑ゆき'],
                stub: 'flipflops',
                uniqid: '60asdf62a',
                cover: Cover.generateMockCover(),
                description: 'Autor de...',
                gender: 0,
                website: 'http://www.flipflops.jp/',
                facebook: null,
                twitter: null,
                pixiv: null,
                blood_type: 0,
                birth_date: null,
                birsth_place: null,
                created: new Date,
                updated: new Date
            }
        ];
    }

    id: number;
    name: string;
    names: string[];
    stub: string;
    uniqid: string;
    cover: Object;
    description: string;
    gender: number;
    website: string;
    facebook: string;
    twitter: string;
    pixiv: string;
    blood_type: number;
    birth_date: Date;
    birsth_place: string;
    series?: Serie[];
    rol?: string;
    created: Date;
    updated: Date;

    constructor() {
        this.id = 1;
        this.name = '';
        this.names = [];
        this.stub = '';
        this.uniqid = '';
        this.cover = null;
        this.description = '';
        this.gender = 0;
        this.website = '';
        this.facebook = '';
        this.twitter = '';
        this.pixiv = '';
        this.blood_type = 0;
        this.birth_date = null;
        this.birsth_place = '';
        this.series = [];
        this.rol = '';
        this.created = new Date;
        this.updated = new Date;
    }
}
