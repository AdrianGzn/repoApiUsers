import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCurrencysComponent } from './general-currencys.component';

describe('GeneralCurrencysComponent', () => {
  let component: GeneralCurrencysComponent;
  let fixture: ComponentFixture<GeneralCurrencysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralCurrencysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralCurrencysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
