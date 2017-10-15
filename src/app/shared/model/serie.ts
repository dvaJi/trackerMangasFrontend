import { Cover, Magazine } from './';
import { Release } from '../../releases/release';

export class Serie {
    id: number;
    name: string;
    type: string;
    description: string;
    status_oc: string;
    completely_sc: number;
    anime_status: string;
    year: number;
    cover: Cover;
    licensed: number;
    created: Date;
    updated: Date;
    staff: string[];
    characters: string;
    genres: number[];
    releases: Release;
    magazines: Magazine;
}
