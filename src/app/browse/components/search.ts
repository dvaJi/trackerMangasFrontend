import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';

@Component({
    selector: 'app-browse-search',
    template: `
    <h3>Buscar Serie</h3>
    <div class="explore-search">
      <div class="explore-search-wrapper">
        <div class="col-auto">
          <label class="sr-only" for="search">Buscar</label>
          <div class="input-group mb-2 mb-sm-0">
            <input type="text" class="form-control" id="search" placeholder="Buscar..." />
          </div>
        </div>
      </div>
      <div class="explore-search-info">
        O has una
        <a href="/serie">búsqueda avanzada</a>
      </div>
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
  `,
    ],
})
export class BrowseSearchComponent {

}
