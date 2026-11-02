import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagamentoPage } from './pagamento-page';

describe('PagamentoPage', () => {
  let component: PagamentoPage;
  let fixture: ComponentFixture<PagamentoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
