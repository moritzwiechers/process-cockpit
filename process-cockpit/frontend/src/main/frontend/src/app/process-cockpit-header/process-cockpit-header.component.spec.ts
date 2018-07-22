import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCockpitHeaderComponent } from './process-cockpit-header.component';

describe('ProcessCockpitHeaderComponent', () => {
  let component: ProcessCockpitHeaderComponent;
  let fixture: ComponentFixture<ProcessCockpitHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessCockpitHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCockpitHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
