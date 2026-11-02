import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioCartao } from './formulario-cartao';

describe('FormularioCartao', () => {
  let component: FormularioCartao;
  let fixture: ComponentFixture<FormularioCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCartao],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCartao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
