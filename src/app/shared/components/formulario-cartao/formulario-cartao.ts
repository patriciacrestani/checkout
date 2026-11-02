import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { DetalhesCartao, MeioPagamentoCartao } from '../../models/detalhes-cartao';
import { MeioPagamentoEnum } from '../../enums/meio-pagamento-enum';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-formulario-cartao',
  templateUrl: './formulario-cartao.html',
})
export class FormularioCartao {
  metodoPagamento = input.required<MeioPagamentoCartao>();

  processandoPagamento = signal<boolean>(false);

  detalhesCartao = signal<DetalhesCartao>({
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: ''
  });

  formulario = form(this.detalhesCartao);

  tituloMetodoPagamento = computed<string>(() => {
    const metodoPagamento = this.metodoPagamento();
    if (metodoPagamento === MeioPagamentoEnum.Credito)
      return "Cartão de crédito";
    return "Cartão de débito";
  });

  erro(campo: keyof DetalhesCartao): string | null {
    const controle = this.formulario[campo]();

    if (!controle.touched || !controle.errors) return null;

    if (controle.getError('required')) {
      return {
        numeroCartao: 'Informe o número do cartão.',
        nomeCartao: 'Informe o nome do titular.',
        validade: 'Informe a validade do cartão.',
        cvv: 'Informe o CVV.',
      }[campo];
    }

    if (controle.getError('cardNumberFormat'))
      return 'Use apenas números, espaços ou hífens no número do cartão.';

    if (controle.getError('cardNumberLength'))
      return 'O número do cartão deve ter entre 13 e 19 dígitos.';

    if (controle.getError('cardNumberChecksum'))
      return 'O número do cartão é inválido. Confira os dígitos.';

    if (controle.getError('cardExpiryFormat')) return 'Use o formato MM/AA ou MM/AAAA.';

    if (controle.getError('cardExpiryMonth')) return 'Informe um mês entre 01 e 12.';

    if (controle.getError('cardExpiryExpired')) return 'O cartão está vencido.';

    if (controle.getError('cardCvvFormat')) return 'O CVV deve conter 3 ou 4 dígitos numéricos.';
    return 'Confira este campo.';
  }

}
