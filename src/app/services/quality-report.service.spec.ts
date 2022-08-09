import { TestBed } from '@angular/core/testing';

import { QualityReportService } from './quality-report.service';

describe('QualityReportService', () => {
  let service: QualityReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
