import Scan from '../../src/app/models/scan';
import { CoverMock } from './cover-mock';

export class ScanMock {

    static generateObjectMockScan(): Scan {
        return {
            id: 1,
            name: 'Ravens Scans',
            stub: 'ravens_scans',
            uniqid: '90asdf62a',
            cover: CoverMock.generateMockCover(),
            description: 'Danos un me gusta en nuestra página de facebook ',
            website: 'http://ravens-scans.com',
            facebook: 'ravensscans',
            twitter: null,
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
                cover: CoverMock.generateMockCover(),
                description: 'Danos un me gusta en nuestra página de facebook ',
                website: 'http://ravens-scans.com',
                facebook: 'ravensscans',
                twitter: null,
                creation_date: null,
                created: new Date,
                updated: new Date
            },
            {
                id: 1,
                name: 'Joker Fansub',
                stub: 'joker_fansub',
                uniqid: '90asdf62a',
                cover: CoverMock.generateMockCover(),
                description: 'Danos un me gusta en nuestra página de facebook ',
                website: 'http://jokerfansub.com',
                facebook: 'jokerfansub',
                twitter: null,
                creation_date: null,
                created: new Date,
                updated: new Date
            }
        ];
    }
}
