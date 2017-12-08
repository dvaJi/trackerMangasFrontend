export default class Publisher {

    id: number;
    name: string;
    stub: string;
    uniqid: string;
    description: string;
    type: string;
    website: string;
    created: Date;
    updated: Date;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.uniqid = '';
        this.stub = '';
        this.website = '';
        this.created = new Date;
        this.updated = new Date;
    }
}
