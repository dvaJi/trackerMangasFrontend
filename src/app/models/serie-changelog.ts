import { User, Serie } from '@app/models';

export class SerieChangelogDetail {
  id: number;
  column: string;
  oldValue: string;
  newValue: string;
  updated: Date;
  created: Date;

  constructor() {
    this.id = 0;
    this.column = '';
    this.oldValue = '';
    this.newValue = '';
    this.created = new Date();
    this.updated = new Date();
  }
}

export class SerieChangelog {
  id: number;
  serie: Serie;
  user: User;
  status: string;
  details: SerieChangelogDetail;
  created: Date;
  updated: Date;

  constructor() {
    this.id = 0;
    this.serie = null;
    this.user = null;
    this.status = '';
    this.details = null;
    this.created = new Date();
    this.updated = new Date();
  }
}
