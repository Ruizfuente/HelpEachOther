import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCreationComponent } from './point-creation.component';

describe('PointCreationComponent', () => {
  let component: PointCreationComponent;
  let fixture: ComponentFixture<PointCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
