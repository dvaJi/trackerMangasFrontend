import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SharedModule } from '@app/shared';
import { BrowseComponent } from './browse.component';
import { SerieService } from '@app/services';
import { AuthenticationService } from '@app/core';

import * as BrowseActions from './browse.action';
import { BrowseEffects } from './browse.effects';
import { BrowseReducer } from './browse.reducer';
import { BrowseState, SerieState } from './browse.state';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;
  let store: Store<BrowseState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...BrowseReducer,
          'series': combineReducers(BrowseReducer)
        }),
        EffectsModule.forRoot([BrowseEffects])
      ],
      declarations: [BrowseComponent],
      providers: [
        SerieService,
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, AuthenticationService,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    const authenticationService = TestBed.get(AuthenticationService);
    authenticationService.guessCredentials = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
