import { Component, computed, effect, inject, input, OnInit, output, signal, untracked } from '@angular/core';
import { DetalhesCartao, MeioPagamentoCartao } from '../../models/detalhes-cartao';
import { MeioPagamentoEnum } from '../../enums/meio-pagamento-enum';
import { disabled, form, FormField, maxLength, minLength, pattern, required, validate } from '@angular/forms/signals';
import { BandeiraCartaoEnum } from '../../enums/bandeira-cartao-enum';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [FormField, CurrencyPipe],
  selector: 'app-formulario-cartao',
  templateUrl: './formulario-cartao.html',
})
export class FormularioCartao {
  meioPagamento = input.required<MeioPagamentoCartao>();
  desabilitarFormulario = input.required<boolean>();
  valor = input.required<number>();

  enviarDadosCartao = output<DetalhesCartao>();

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

    disabled(schemaPath, {
      when: () => this.desabilitarFormulario(),
    });

    validate(schemaPath.numeroCartao, ({ value }) => {
      const numero = value();

      if (!/^[0-9]{4}( [0-9]{4}){3}$/.test(numero)) {
        return null;
      }

      if (this.identificarBandeira(numero) === null) {
        return {
          kind: 'bandeiraNaoAceita',
          message: 'Aceitamos apenas cartões Visa e Mastercard',
        };
      }

      if (!this.validarLuhn(numero)) {
        return {
          kind: 'numeroCartaoInvalido',
          message: 'Número do cartão inválido. Confira os dígitos',
        };
      }

      return null;
    });

    validate(schemaPath.validade, ({ value }) => {
      const validade = value();

      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(validade)) {
        return null;
      }

      return this.validarValidadeCartao(validade)
        ? null
        : {
          kind: 'cartaoVencido',
          message: 'O cartão está vencido',
        };
    });
  });

  tituloMeioPagamento = computed<string>(() => {
    const meioPagamento = this.meioPagamento();
    if (meioPagamento === MeioPagamentoEnum.Credito)
      return "Cartão de crédito";
    return "Cartão de débito";
  });

  bandeiraCartaoEnum = BandeiraCartaoEnum;

  readonly bandeiraCartao = computed<BandeiraCartaoEnum | null>(() =>
    this.identificarBandeira(this.detalhesCartao().numeroCartao),
  );

  identificarBandeira(numero: string): BandeiraCartaoEnum | null {
    const digitos = numero.replace(/ /g, '');

    if (!/^[0-9]+$/.test(digitos)) {
      return null;
    }

    if (digitos.startsWith('4')) {
      return BandeiraCartaoEnum.Visa;
    }

    const prefixo2 = Number(digitos.slice(0, 2));
    const prefixo4 = Number(digitos.slice(0, 4));

    const mastercardSerie5 =
      digitos.length >= 2 &&
      prefixo2 >= 51 &&
      prefixo2 <= 55;

    const mastercardSerie2 =
      digitos.length >= 4 &&
      prefixo4 >= 2221 &&
      prefixo4 <= 2720;

    if (mastercardSerie5 || mastercardSerie2) {
      return BandeiraCartaoEnum.Mastercard;
    }

    return null;
  }

  validarLuhn(numero: string): boolean {
    const digitos = numero.replace(/ /g, '');

    if (!/^[0-9]{16}$/.test(digitos)) {
      return false;
    }

    let soma = 0;
    let dobrar = false;

    for (let indice = digitos.length - 1; indice >= 0; indice--) {
      let digito = Number(digitos[indice]);

      if (dobrar) {
        digito *= 2;

        if (digito > 9) {
          digito -= 9;
        }
      }

      soma += digito;
      dobrar = !dobrar;
    }

    return soma % 10 === 0;
  }

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

  validarValidadeCartao(
    validade: string,
    referencia: Date = new Date(),
  ): boolean {
    const resultado = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.exec(validade);

    if (!resultado) {
      return false;
    }

    const mes = Number(resultado[1]);
    const ano = 2000 + Number(resultado[2]);

    const anoAtual = referencia.getFullYear();
    const mesAtual = referencia.getMonth() + 1;

    return ano > anoAtual || (ano === anoAtual && mes >= mesAtual);
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

  concluirPagamento(): void {
    const dadosFormulario = this.detalhesCartao();
    dadosFormulario.numeroCartao = dadosFormulario.numeroCartao.replace(/\s/g, '');
    this.enviarDadosCartao.emit(dadosFormulario);
  }
}
