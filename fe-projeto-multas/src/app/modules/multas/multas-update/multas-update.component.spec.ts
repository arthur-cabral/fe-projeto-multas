import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultasUpdateComponent } from './multas-update.component';

describe('MultasUpdateComponent', () => {
  let component: MultasUpdateComponent;
  let fixture: ComponentFixture<MultasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultasUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
