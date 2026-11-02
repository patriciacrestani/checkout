import { Component, effect, signal, model, output, untracked } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeioPagamentoEnum, meiosPagamento } from '../../enums/meio-pagamento-enum';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-seletor-meio-pagamento',
  templateUrl: './seletor-meio-pagamento.html',
})
export class SeletorMeioPagamento {
  readonly mudarMeioPagamento = output<MeioPagamentoEnum>();

  readonly listaMeiosPagamento = signal(meiosPagamento);

  protected meioPagamentoSelecionado = model<MeioPagamentoEnum>();

  meioPagamentoEnum = MeioPagamentoEnum;

  sendSelectedMethod = effect(() => {
    const selectedMethod = this.meioPagamentoSelecionado();
    if (selectedMethod)
      untracked(() => this.mudarMeioPagamento.emit(selectedMethod));
  });
}
