import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecordPageComponent } from './browse-record-page.component';

describe('BrowseRecordPageComponent', () => {
  let component: BrowseRecordPageComponent;
  let fixture: ComponentFixture<BrowseRecordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRecordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
