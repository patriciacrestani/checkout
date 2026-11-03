import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagamentoPix } from './pagamento-pix';

describe('PagamentoPix', () => {
  let component: PagamentoPix;
  let fixture: ComponentFixture<PagamentoPix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoPix],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoPix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
