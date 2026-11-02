import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeletorMeioPagamento } from './seletor-meio-pagamento';

describe('SeletorMeioPagamento', () => {
  let component: SeletorMeioPagamento;
  let fixture: ComponentFixture<SeletorMeioPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorMeioPagamento],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorMeioPagamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
