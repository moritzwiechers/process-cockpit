import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInstanceDetailComponent } from './process-instance-detail.component';

describe('ProcessInstanceDetailComponent', () => {
  let component: ProcessInstanceDetailComponent;
  let fixture: ComponentFixture<ProcessInstanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInstanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInstanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
