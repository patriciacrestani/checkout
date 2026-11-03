import { Component, computed, input } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { TipoPlanoEnumDescricao } from '../../enums/tipo-plano-enum';

@Component({
  selector: 'app-sumario-pedido',
  imports: [],
  templateUrl: './sumario-pedido.html',
})
export class SumarioPedido {
  readonly pedido = input.required<Pedido>();
  readonly exibirTitulo = input<boolean>(false);

  tipoPlano = computed<string>(() => {
    const tipoPlano = this.pedido().tipoPlano;
    return TipoPlanoEnumDescricao[tipoPlano];
  });

  quantidadeUsuarios = computed<string>(() => {
    const quantidade = this.pedido().quantidadeUsuarios;
    if (quantidade === 1)
      return `${quantidade} usuário`;
    return `${quantidade} usuários`;
  });
}
