import Scan from './scan';

export default class Release {

    id: number;
    chapter: number;
    volume: number;
    groups: Scan[];
    created: Date;
    updated: Date;

    constructor() {
        this.id = 0;
        this.chapter = 0;
        this.volume = 0;
        this.groups = [];
        this.created = new Date;
        this.updated = new Date;
    }
}
