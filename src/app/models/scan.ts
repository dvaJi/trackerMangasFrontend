import { Release, Cover } from '@app/models';

export class Scan {

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
  releases?: Release[];
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
    this.creation_date = null;
    this.created = new Date;
    this.updated = new Date;
  }
}
