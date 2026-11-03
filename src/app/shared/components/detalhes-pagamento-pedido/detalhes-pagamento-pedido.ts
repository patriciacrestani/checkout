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
  readonly detalhesCartao = input<DetalhesCartao | null>();

  detalhesPagamento = computed<string>(() => {
    const meioPagamento = this.meioPagamento();
    if (meioPagamento === MeioPagamentoEnum.Pix) {
      return 'PIX';
    }
    const meioPagamentoDescricao = MeioPagamentoEnumDescricao[meioPagamento];

    const detalhesCartao = this.detalhesCartao();
    if (detalhesCartao)
      return `${meioPagamentoDescricao} - **** ${detalhesCartao.numeroCartao.slice(12, 16)}`;

    return meioPagamentoDescricao;
  });
}
