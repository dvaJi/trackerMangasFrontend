export class Magazine {

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
