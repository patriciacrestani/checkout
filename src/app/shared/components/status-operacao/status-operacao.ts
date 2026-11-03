import { Component, input } from '@angular/core';

export type EstadoOperacao = 'sucesso' | 'erro' | 'carregamento';

@Component({
  imports: [],
  selector: 'app-status-operacao',
  templateUrl: './status-operacao.html',
})
export class StatusOperacao {
  readonly titulo = input.required<string>();
  readonly descricao = input<string>();
  readonly estado = input.required<EstadoOperacao>();
}
