import { Magazine, Release, Genre, Cover, Staff, SerieRanking } from '@app/models';

export class Serie {
  id: number;
  name: string;
  names: string[];
  stub: string;
  uniqid: string;
  type: string;
  description: string;
  id_demographic: string;
  status_oc: number;
  status_oc_note: string;
  completely_sc: number;
  anime_status: string;
  publication_date: Date;
  cover: Cover;
  licensed: number;
  loading: boolean;
  popularity: number;
  rated: number;
  rated_count: number;
  ranking: SerieRanking[];
  staff: Staff[];
  staffFormated: Staff[];
  genres: Genre[];
  releases: Release[];
  magazines: Magazine[];
  revision_type?: number;
  revision_version?: number;
  created: Date;
  updated: Date;

  constructor() {
    this.name = '';
    this.names = [];
    this.uniqid = '';
    this.stub = '';
    this.type = '';
    this.description = '';
    this.id_demographic = '';
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
    this.staffFormated = [];
    this.genres = [];
    this.releases = [];
    this.magazines = [];
    this.ranking = [];
  }
}
