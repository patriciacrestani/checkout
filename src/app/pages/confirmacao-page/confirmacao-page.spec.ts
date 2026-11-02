import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacaoPage } from './confirmacao-page';

describe('ConfirmacaoPage', () => {
  let component: ConfirmacaoPage;
  let fixture: ComponentFixture<ConfirmacaoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
