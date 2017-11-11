import Magazine from './magazine';
import Release from './release';
import Genre from './genre';
import Cover from './cover';
import Staff from './staff';
import SerieRanking from './serieRanking';

export default class Serie {

    static generateMockSerie(): Serie {
        return {
            id: 1,
            name: 'Prison School',
            names: ['Kangoku Gakuen'],
            type: 'Manga',
            description: 'Hachimitus una honorable escuela únicamente para chicas.',
            stub: 'prison_school',
            uniqid: '99ssd999asd0',
            demographic: 'Seinen',
            status_oc: 0,
            status_oc_note: '',
            completely_sc: 0,
            anime_status: '',
            publication_date: new Date('2011-07-02'),
            cover: Cover.generateMockCover(),
            licensed: 0,
            popularity: 0,
            rated: 5,
            rated_count: 2,
            ranking: SerieRanking.generateArrayMockSerieRanking(),
            staff: Staff.generateArrayMockStaffs(),
            genres: Genre.generateMockGenres(),
            releases: Release.generateMockReleases(),
            magazines: Magazine.generateMockMagazines(),
            created: new Date,
            updated: new Date
        };
    }

    id: number;
    name: string;
    names: string[];
    stub: string;
    uniqid: string;
    type: string;
    description: string;
    demographic: string;
    status_oc: number;
    status_oc_note: string;
    completely_sc: number;
    anime_status: string;
    publication_date: Date;
    cover: Object;
    licensed: number;
    popularity: number;
    rated: number;
    rated_count: number;
    ranking: SerieRanking[];
    staff: Staff[];
    genres: Genre[];
    releases: Release[];
    magazines: Magazine[];
    created: Date;
    updated: Date;

    constructor( ) {
        this.name = '';
        this.names = [];
        this.uniqid = '';
        this.stub = '';
        this.type = '';
        this.description = '';
        this.demographic = '';
        this.status_oc = 0;
        this.status_oc_note = '';
        this.completely_sc = 0;
        this.anime_status = '';
        this.publication_date = null;
        this.cover = null;
        this.licensed = 0;
        this.created = new Date();
        this.updated = new Date();
        this.staff = [];
        this.genres = [];
        this.releases = [];
        this.magazines = [];
        this.ranking = [];
    }
}
