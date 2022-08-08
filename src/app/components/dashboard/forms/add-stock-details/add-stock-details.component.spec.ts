import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockDetailsComponent } from './add-stock-details.component';

describe('AddStockDetailsComponent', () => {
  let component: AddStockDetailsComponent;
  let fixture: ComponentFixture<AddStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
