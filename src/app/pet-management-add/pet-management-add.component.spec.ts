import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetManagementAddComponent } from './pet-management-add.component';

describe('PetManagementAddComponent', () => {
  let component: PetManagementAddComponent;
  let fixture: ComponentFixture<PetManagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetManagementAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
