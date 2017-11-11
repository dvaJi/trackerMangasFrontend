import Scan from './scan';

export default class Release {

    static generateMockReleases(): Release[] {
        return [
            {
                id: 1,
                chapter: 1,
                volume: 1,
                groups: Scan.generateArrayMockScans(),
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                chapter: 2,
                volume: 1,
                groups: Scan.generateArrayMockScans(),
                created: new Date,
                updated: new Date
            }
        ];
    }

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
