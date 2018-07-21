import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SerieCardComponent } from './serie-card';
import { SerieCardEmptyComponent } from './serie-card-empty';
import { SerieCardListComponent } from './serie-card-list';
import { BrowseSearchComponent } from './search';

export const COMPONENTS = [
    SerieCardComponent,
    SerieCardEmptyComponent,
    SerieCardListComponent,
    BrowseSearchComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})

export class BrowseComponentsModule { }
