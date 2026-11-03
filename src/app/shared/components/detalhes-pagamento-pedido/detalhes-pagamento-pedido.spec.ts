import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesPagamentoPedido } from './detalhes-pagamento-pedido';

describe('DetalhesPagamentoPedido', () => {
  let component: DetalhesPagamentoPedido;
  let fixture: ComponentFixture<DetalhesPagamentoPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPagamentoPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesPagamentoPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
