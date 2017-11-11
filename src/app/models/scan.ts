import Release from './release';
import Cover from './cover';

export default class Scan {

  static generateObjectMockScan(): Scan {
    return {
      id: 1,
      name: 'Ravens Scans',
      stub: 'ravens_scans',
      uniqid: '90asdf62a',
      cover: Cover.generateMockCover(),
      description: 'Danos un me gusta en nuestra página de facebook ',
      website: 'http://ravens-scans.com',
      facebook: 'ravensscans',
      twitter: null,
      releases: Release.generateMockReleases(),
      creation_date: null,
      created: new Date,
      updated: new Date
    };
  }

  static generateArrayMockScans(): Scan[] {
    return [
      {
        id: 1,
        name: 'Ravens Scans',
        stub: 'ravens_scans',
        uniqid: '90asdf62a',
        cover: Cover.generateMockCover(),
        description: 'Danos un me gusta en nuestra página de facebook ',
        website: 'http://ravens-scans.com',
        facebook: 'ravensscans',
        twitter: null,
        releases: Release.generateMockReleases(),
        creation_date: null,
        created: new Date,
        updated: new Date
      },
      {
        id: 1,
        name: 'Joker Fansub',
        stub: 'joker_fansub',
        uniqid: '90asdf62a',
        cover: Cover.generateMockCover(),
        description: 'Danos un me gusta en nuestra página de facebook ',
        website: 'http://jokerfansub.com',
        facebook: 'jokerfansub',
        twitter: null,
        releases: Release.generateMockReleases(),
        creation_date: null,
        created: new Date,
        updated: new Date
      }
    ];
  }

  id: number;
  name: string;
  stub: string;
  uniqid: string;
  cover: Object;
  description: string;
  website: string;
  facebook: string;
  twitter: string;
  creation_date: Date;
  releases: Release[];
  created: Date;
  updated: Date;

  constructor() {
    this.id = 1;
    this.name = '';
    this.stub = '';
    this.uniqid = '';
    this.cover = null;
    this.description = '';
    this.website = '';
    this.facebook = '';
    this.twitter = '';
    this.releases = [];
    this.creation_date = null;
    this.created = new Date;
    this.updated = new Date;
  }
}
