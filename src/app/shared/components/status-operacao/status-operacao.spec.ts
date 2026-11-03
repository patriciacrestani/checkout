import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusOperacao } from './status-operacao';

describe('StatusOperacao', () => {
  let component: StatusOperacao;
  let fixture: ComponentFixture<StatusOperacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusOperacao],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusOperacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
