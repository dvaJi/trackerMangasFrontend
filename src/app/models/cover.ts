export default class Cover {

  static generateMockCover(): Cover {
    return {
      original: {
        id: 1,
        path_full: '/api/content/staff/default.png'
      },
      large: {
        id: 2,
        path_full: '/api/content/staff/default.png'
      },
      medium: {
        id: 3,
        path_full: '/api/content/staff/default.png'
      },
      thumb: {
        id: 4,
        path_full: '/api/content/staff/default.png'
      },
    };
  }

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
