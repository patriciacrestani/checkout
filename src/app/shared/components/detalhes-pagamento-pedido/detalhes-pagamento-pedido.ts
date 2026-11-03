import { Component, computed, input } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MeioPagamentoEnum, MeioPagamentoEnumDescricao } from '../../enums/meio-pagamento-enum';
import { DetalhesCartao } from '../../models/detalhes-cartao';

@Component({
  imports: [CurrencyPipe, DatePipe],
  selector: 'app-detalhes-pagamento-pedido',
  templateUrl: './detalhes-pagamento-pedido.html',
})
export class DetalhesPagamentoPedido {
  readonly pedido = input.required<Pedido>();
  readonly meioPagamento = input.required<MeioPagamentoEnum>();
  readonly detalhesCartao = input.required<DetalhesCartao>();

  meioPagamentoDescricao = computed<string>(() => {
    const meioPagamento = this.meioPagamento();
    return MeioPagamentoEnumDescricao[meioPagamento];
  });

  numeroCartao = computed<string>(() => {
    const detalhesCartao = this.detalhesCartao();
    return `**** ${detalhesCartao.numeroCartao.slice(12, 16)}`
  });
}
