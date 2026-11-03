import { Component, inject } from '@angular/core';
import { CheckoutStore } from '../../shared/stores/checkout-store';
import { Tag } from '../../shared/components/tag/tag';
import { StatusOperacao } from '../../shared/components/status-operacao/status-operacao';
import { SumarioPedido } from '../../shared/components/sumario-pedido/sumario-pedido';
import { Message } from '../../shared/components/message/message';
import { DetalhesPagamentoPedido } from '../../shared/components/detalhes-pagamento-pedido/detalhes-pagamento-pedido';

@Component({
  imports: [StatusOperacao, Tag, SumarioPedido, Message, DetalhesPagamentoPedido],
  selector: 'app-confirmacao-page',
  templateUrl: './confirmacao-page.html',
})
export class ConfirmacaoPage {
  readonly store = inject(CheckoutStore);
}
