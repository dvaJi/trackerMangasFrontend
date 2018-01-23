import { Staff } from '@app/models';
import { CoverMock } from './cover-mock';

export class StaffMock {

    static generateObjectMockStaff(): Staff {
        return {
            id: 1,
            name: 'Kirioka Sana',
            names: ['桐丘さな'],
            stub: 'kirioka_sana',
            uniqid: '90asdf62a',
            cover: CoverMock.generateMockCover(),
            description: 'Autor de...',
            gender: 0,
            website: null,
            facebook: null,
            twitter: 'sana_kirioka',
            pixiv: null,
            blood_type: 0,
            birth_date: null,
            birsth_place: null,
            created: new Date,
            updated: new Date
        };
    }

    static generateArrayMockStaffs(): Staff[] {
        return [
            {
                id: 1,
                name: 'Kirioka Sana',
                names: ['桐丘さな'],
                stub: 'kirioka_sana',
                uniqid: '90asdf62a',
                cover: CoverMock.generateMockCover(),
                description: 'Autor de...',
                gender: 0,
                website: null,
                facebook: null,
                twitter: 'sana_kirioka',
                pixiv: null,
                blood_type: 0,
                birth_date: null,
                birsth_place: null,
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                name: 'FLIPFLOPs',
                names: ['FLIPFLOPs (高畑ゆき)', 'FLIPFLOPs (TAKAHATA Yuki)', 'FRIPFROPs', '高畑ゆき'],
                stub: 'flipflops',
                uniqid: '60asdf62a',
                cover: CoverMock.generateMockCover(),
                description: 'Autor de...',
                gender: 0,
                website: 'http://www.flipflops.jp/',
                facebook: null,
                twitter: null,
                pixiv: null,
                blood_type: 0,
                birth_date: null,
                birsth_place: null,
                created: new Date,
                updated: new Date
            }
        ];
    }
}
