import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleExcelFileUploadComponent } from './multiple-excel-file-upload.component';

describe('MultipleExcelFileUploadComponent', () => {
  let component: MultipleExcelFileUploadComponent;
  let fixture: ComponentFixture<MultipleExcelFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleExcelFileUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleExcelFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
