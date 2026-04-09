import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemsReportComponent } from './gems-report.component';

describe('GemsReportComponent', () => {
  let component: GemsReportComponent;
  let fixture: ComponentFixture<GemsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
