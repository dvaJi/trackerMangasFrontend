import Serie from './serie';
import Cover from './cover';

export default class Staff {

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
