import Release from '../../src/app/models/release';
import { ScanMock } from './scan-mock';

export class ReleaseMock {

    static generateMockReleases(): Release[] {
        return [
            {
                id: 1,
                chapter: 1,
                volume: 1,
                groups: ScanMock.generateArrayMockScans(),
                created: new Date,
                updated: new Date
            },
            {
                id: 2,
                chapter: 2,
                volume: 1,
                groups: ScanMock.generateArrayMockScans(),
                created: new Date,
                updated: new Date
            }
        ];
    }
}
