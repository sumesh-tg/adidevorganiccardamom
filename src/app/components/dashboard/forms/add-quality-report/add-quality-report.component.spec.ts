import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualityReportComponent } from './add-quality-report.component';

describe('AddQualityReportComponent', () => {
  let component: AddQualityReportComponent;
  let fixture: ComponentFixture<AddQualityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQualityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQualityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
