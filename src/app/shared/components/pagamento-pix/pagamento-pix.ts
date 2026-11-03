import { Component, input, output } from '@angular/core';
import { CodigoPix } from '../codigo-pix/codigo-pix';
import { Carregamento } from '../carregamento/carregamento';
import { Erro } from '../erro/erro';

@Component({
  imports: [CodigoPix, Carregamento, Erro],
  selector: 'app-pagamento-pix',
  templateUrl: './pagamento-pix.html',
})
export class PagamentoPix {
  readonly codigoPix = input.required<string | null>();
  readonly carregando = input.required<boolean>();
  readonly erro = input.required<string | null>();

  verificarPagamentoPix = output<void>();

  concluirPagamento(): void {
    this.verificarPagamentoPix.emit();
  }
}
