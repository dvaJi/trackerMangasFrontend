import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'toArray', pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.values(value);
    }
}
