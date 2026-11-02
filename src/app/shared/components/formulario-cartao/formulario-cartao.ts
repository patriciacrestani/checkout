import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { DetalhesCartao, MeioPagamentoCartao } from '../../models/detalhes-cartao';
import { MeioPagamentoEnum } from '../../enums/meio-pagamento-enum';
import { form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-formulario-cartao',
  templateUrl: './formulario-cartao.html',
})
export class FormularioCartao {
  meioPagamento = input.required<MeioPagamentoCartao>();

  processandoPagamento = signal<boolean>(false);

  detalhesCartao = signal<DetalhesCartao>({
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: ''
  });

  formulario = form(this.detalhesCartao, (schemaPath) => {
    required(schemaPath.numeroCartao, { message: 'Número do cartão obrigatório' });
    required(schemaPath.nomeCartao, { message: 'Nome no cartão obrigatório' });
    required(schemaPath.validade, { message: 'Validade do cartão obrigatória' });
    required(schemaPath.cvv, { message: 'CVV do cartão obrigatório' });

    minLength(schemaPath.nomeCartao, 10, { message: 'O nome no cartão deve ter pelo menos 10 caracteres' });
    maxLength(schemaPath.nomeCartao, 500, { message: 'O nome no cartão não pode exceder 500 caracteres' });

    pattern(schemaPath.numeroCartao, /^[0-9]{4}( [0-9]{4}){3}$/, {
      message: 'Informe o cartão no formato 0000 0000 0000 0000',
    });
    pattern(schemaPath.nomeCartao, /^[\p{L}\p{M} ]+$/u, {
      message: 'O nome no cartão deve conter apenas letras e espaços',
    });
    pattern(schemaPath.validade, /^(0[1-9]|1[0-2])\/[0-9]{2}$/, {
      message: 'Informe a validade no formato MM/AA, com mês entre 01 e 12',
    });
    pattern(schemaPath.cvv, /^[0-9]{3}$/, {
      message: 'O CVV deve conter exatamente 3 dígitos',
    });
  });

  tituloMeioPagamento = computed<string>(() => {
    const meioPagamento = this.meioPagamento();
    if (meioPagamento === MeioPagamentoEnum.Credito)
      return "Cartão de crédito";
    return "Cartão de débito";
  });

  atualizarNumeroCartao(event: Event): void {
    const input = event.target as HTMLInputElement;

    const digitos = input.value
      .replace(/[^0-9]/g, '')
      .slice(0, 16);

    const valorFormatado = digitos.match(/.{1,4}/g)?.join(' ') ?? '';

    input.value = valorFormatado;
    this.formulario.numeroCartao().value.set(valorFormatado);
  }

  atualizarNomeCartao(event: Event): void {
    const input = event.target as HTMLInputElement;

    const valor = input.value
      .normalize('NFC')
      .replace(/[^\p{L} ]/gu, '');

    input.value = valor;
    this.formulario.nomeCartao().value.set(valor);
  }

  atualizarValidade(event: Event): void {
    const input = event.target as HTMLInputElement;

    const digitos = input.value
      .replace(/[^0-9]/g, '')
      .slice(0, 4);

    const valorFormatado = digitos.length > 2
      ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
      : digitos;

    input.value = valorFormatado;
    this.formulario.validade().value.set(valorFormatado);
  }

  atualizarCvv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.replace(/[^0-9]/g, '').slice(0, 3);

    input.value = valor;
    this.formulario.cvv().value.set(valor);
  }

  erro(campo: keyof DetalhesCartao): string | null {
    const controle = this.formulario[campo]();

    if (!controle.touched() || !controle.invalid()) {
      return null;
    }

    return controle.errors()[0]?.message ?? null;
  }
}
