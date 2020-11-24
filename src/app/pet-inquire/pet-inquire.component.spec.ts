import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetInquireComponent} from './pet-inquire.component';

describe('PetInquireComponent', () => {
  let component: PetInquireComponent;
  let fixture: ComponentFixture<PetInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetInquireComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
