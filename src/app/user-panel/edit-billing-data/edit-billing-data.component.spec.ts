import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingDataComponent } from './edit-billing-data.component';

describe('EditBillingDataComponent', () => {
  let component: EditBillingDataComponent;
  let fixture: ComponentFixture<EditBillingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
