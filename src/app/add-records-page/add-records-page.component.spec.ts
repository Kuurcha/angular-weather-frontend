import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordsPageComponent } from './add-records-page.component';

describe('AddRecordsPageComponent', () => {
  let component: AddRecordsPageComponent;
  let fixture: ComponentFixture<AddRecordsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecordsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
