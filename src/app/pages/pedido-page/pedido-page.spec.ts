import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPage } from './pedido-page';

describe('PedidoPage', () => {
  let component: PedidoPage;
  let fixture: ComponentFixture<PedidoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
