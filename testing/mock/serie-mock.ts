import { CoverMock } from './cover-mock';
import { StaffMock } from './staff-mock';
import { GenreMock } from './genre-mock';
import { ReleaseMock } from './release-mock';
import { MagazineMock } from './magazine-mock';
import { SerieRankingMock } from './serie-ranking-mock';

import { Serie } from '@app/models';

export class SerieMock {
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
            cover: CoverMock.generateMockCover(),
            licensed: 0,
            loading: false,
            popularity: 0,
            rated: 5,
            rated_count: 2,
            ranking: SerieRankingMock.generateArrayMockSerieRanking(),
            staff: StaffMock.generateArrayMockStaffs(),
            staffFormated: StaffMock.generateArrayMockStaffs(),
            genres: GenreMock.generateMockGenres(),
            releases: ReleaseMock.generateMockReleases(),
            magazines: MagazineMock.generateMockMagazines(),
            created: new Date,
            updated: new Date
        };
    }

    static generateMockSeries(): Serie[] {
        return [{
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
            cover: CoverMock.generateMockCover(),
            licensed: 0,
            loading: false,
            popularity: 0,
            rated: 5,
            rated_count: 2,
            ranking: SerieRankingMock.generateArrayMockSerieRanking(),
            staff: StaffMock.generateArrayMockStaffs(),
            staffFormated: StaffMock.generateArrayMockStaffs(),
            genres: GenreMock.generateMockGenres(),
            releases: ReleaseMock.generateMockReleases(),
            magazines: MagazineMock.generateMockMagazines(),
            created: new Date,
            updated: new Date
        }];
    }

    static generateEmptyMockSerie(): Serie {
        return {
            id: 0,
            name: '',
            names: [''],
            type: '',
            description: '',
            stub: '',
            uniqid: '',
            demographic: '',
            status_oc: 0,
            status_oc_note: '',
            completely_sc: 0,
            anime_status: '',
            publication_date: new Date,
            cover: CoverMock.generateMockCover(),
            licensed: 0,
            loading: true,
            popularity: 0,
            rated: 0,
            rated_count: 0,
            ranking: SerieRankingMock.generateArrayMockSerieRanking(),
            staff: StaffMock.generateArrayMockStaffs(),
            staffFormated: StaffMock.generateArrayMockStaffs(),
            genres: GenreMock.generateMockGenres(),
            releases: ReleaseMock.generateMockReleases(),
            magazines: MagazineMock.generateMockMagazines(),
            created: new Date,
            updated: new Date
        };
    }
}
