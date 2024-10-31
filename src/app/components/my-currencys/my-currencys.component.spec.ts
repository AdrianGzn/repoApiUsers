import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCurrencysComponent } from './my-currencys.component';

describe('MyCurrencysComponent', () => {
  let component: MyCurrencysComponent;
  let fixture: ComponentFixture<MyCurrencysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCurrencysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCurrencysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
