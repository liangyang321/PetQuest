import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetManagementViewComponent } from './pet-management-view.component';

describe('PetManagementViewComponent', () => {
  let component: PetManagementViewComponent;
  let fixture: ComponentFixture<PetManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetManagementViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
