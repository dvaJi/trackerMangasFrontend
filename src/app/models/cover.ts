export class Cover {

  original: {
    id: number;
    path_full: string
  };
  large: {
    id: number;
    path_full: string
  };
  medium: {
    id: number;
    path_full: string
  };
  thumb: {
    id: number;
    path_full: string
  };

  constructor() {
    this.original = {
      id: 0,
      path_full: ''
    };
    this.large = {
      id: 0,
      path_full: ''
    };
    this.medium = {
      id: 0,
      path_full: ''
    };
    this.thumb = {
      id: 0,
      path_full: ''
    };
  }
}
