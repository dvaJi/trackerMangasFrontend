import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';

@Component({
    selector: 'app-serie-card',
    template: `
    <a class="cover-img"
        [routerLink]="['/serie', id, stub]"
        [ngStyle]="{ 'background-image': thumb}">
    </a>
    <div class="cover-data">
        <a [routerLink]="['/serie', id, stub]">{{ name }}</a>
        <span>
            <div title="Type">{{ type }}</div>
            <div title="Popularity">{{ popularity }}</div>
            <div title="Average Score">{{ rated }}</div>
        </span>
    </div>
  `,
    styles: [
        `
    .cover-img {
        background-position: 50% 50%;
        background-size: cover;
        border-radius: 3px;
        display: block;
        height: 100%;
        position: absolute;
        width: 100%;
    }
    .cover-data {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.01) 100%);
        border-radius: 0 0 3px 3px;
        bottom: 0;
        color: #fff;
        padding: 10px;
        padding-top: 40px;
        position: absolute;
        text-align: left;
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.59);
        width: 100%;
    }
    .cover-data a {
        display: inline-block;
        font-size: 0.9em;
        color: #fff;
        line-height: 1.3;
        padding: 0 3px;
        width: 100%;
        word-wrap: break-word;
    }
    .cover-data div {
        color: #53c4ff;
        display: inline-block;
        font-size: 0.7em;
        margin-top: 10px;
        text-align: center;
        width: 31%;
    }
  `,
    ],
})
export class SerieCardComponent {

    @Input() serie: Serie;

    get id() {
        return this.serie.id;
    }

    get name() {
        return this.serie.name;
    }

    get stub() {
        return this.serie.stub;
    }

    get thumb() {
        return 'url(' + this.serie.cover.thumb.path_full + ')';
    }

    get type() {
        return this.serie.type;
    }

    get rated() {
        return this.serie.rated;
    }

    get popularity() {
        return this.serie.popularity;
    }
}
