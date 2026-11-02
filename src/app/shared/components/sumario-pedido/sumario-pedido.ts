import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-sumario-pedido',
  imports: [CurrencyPipe],
  templateUrl: './sumario-pedido.html',
})
export class SumarioPedido {
  readonly pedido = input.required<Pedido>();
  readonly exibirTitulo = input<boolean>(false);
}
