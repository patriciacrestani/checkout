import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pedido } from '../../models/pedido';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-valores-pedido',
  templateUrl: './valores-pedido.html',
})
export class ValoresPedido {
  readonly pedido = input.required<Pedido>();
}
