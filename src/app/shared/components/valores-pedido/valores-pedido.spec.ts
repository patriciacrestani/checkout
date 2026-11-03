import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValoresPedido } from './valores-pedido';

describe('ValoresPedido', () => {
  let component: ValoresPedido;
  let fixture: ComponentFixture<ValoresPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValoresPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(ValoresPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
