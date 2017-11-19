import Cover from '../../src/app/models/cover';

export class CoverMock {

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
}
