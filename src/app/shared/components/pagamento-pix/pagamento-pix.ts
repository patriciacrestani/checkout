import { Component, input, output } from '@angular/core';
import { CodigoPix } from '../codigo-pix/codigo-pix';
import { StatusOperacao } from '../status-operacao/status-operacao';

@Component({
  imports: [CodigoPix, StatusOperacao],
  selector: 'app-pagamento-pix',
  templateUrl: './pagamento-pix.html',
})
export class PagamentoPix {
  readonly codigoPix = input.required<string | null>();
  readonly carregando = input.required<boolean>();
  readonly erro = input.required<boolean>();
  readonly erroDescricao = input.required<string | null>();

  verificarPagamentoPix = output<void>();

  concluirPagamento(): void {
    this.verificarPagamentoPix.emit();
  }
}
