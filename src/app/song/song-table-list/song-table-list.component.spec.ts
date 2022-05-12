import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongTableListComponent } from './song-table-list.component';

describe('SongTableListComponent', () => {
  let component: SongTableListComponent;
  let fixture: ComponentFixture<SongTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
