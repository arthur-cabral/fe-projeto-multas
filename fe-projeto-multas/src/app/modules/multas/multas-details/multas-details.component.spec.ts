import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultasDetailsComponent } from './multas-details.component';

describe('MultasDetailsComponent', () => {
  let component: MultasDetailsComponent;
  let fixture: ComponentFixture<MultasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultasDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
