import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';

@Component({
    selector: 'app-serie-card-empty',
    template: `<a class="cover-img"></a>`,
    styles: [
        `
    .cover-img {
        border-radius: 3px;
        display: block;
        height: 100%;
        position: absolute;
        width: 100%;
    }
  `,
    ],
})
export class SerieCardEmptyComponent { }
