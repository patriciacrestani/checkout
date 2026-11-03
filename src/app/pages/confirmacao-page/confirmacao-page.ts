import { Component, computed, inject } from '@angular/core';
import { CheckoutStore } from '../../shared/stores/checkout-store';
import { Tag } from '../../shared/components/tag/tag';
import { StatusOperacao } from '../../shared/components/status-operacao/status-operacao';
import { SumarioPedido } from '../../shared/components/sumario-pedido/sumario-pedido';
import { Message } from '../../shared/components/message/message';
import { DetalhesPagamentoPedido } from '../../shared/components/detalhes-pagamento-pedido/detalhes-pagamento-pedido';
import { SessaoStore } from '../../shared/stores/sessao-store';
import { Pedido } from '../../shared/models/pedido';
import { DatePipe } from '@angular/common';

@Component({
  imports: [StatusOperacao, Tag, SumarioPedido, Message, DetalhesPagamentoPedido, DatePipe],
  selector: 'app-confirmacao-page',
  templateUrl: './confirmacao-page.html',
})
export class ConfirmacaoPage {
  readonly store = inject(CheckoutStore);
  readonly sessao = inject(SessaoStore);

  pedido = computed<Pedido | null>(() => this.store.pedido());

  periodoRenovacao = computed<string | null>(() => {
    const pedido = this.pedido();
    if (!pedido) return null;
    const data = new Date(pedido.data);

    if (Number.isNaN(data.getTime())) return null;

    const diaOriginal = data.getUTCDate();

    data.setUTCDate(1);
    data.setUTCMonth(data.getUTCMonth() + 1);

    const ultimoDiaDoMes = new Date(
      Date.UTC(data.getUTCFullYear(), data.getUTCMonth() + 1, 0),
    ).getUTCDate();

    data.setUTCDate(Math.min(diaOriginal, ultimoDiaDoMes));

    return data.toISOString();
  });

}
