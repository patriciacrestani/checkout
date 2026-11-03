import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SumarioPedido } from '../../shared/components/sumario-pedido/sumario-pedido';
import { FormularioCartao } from '../../shared/components/formulario-cartao/formulario-cartao';
import { SeletorMeioPagamento } from '../../shared/components/seletor-meio-pagamento/seletor-meio-pagamento';
import { CheckoutStore } from '../../shared/stores/checkout-store';
import { MeioPagamentoEnum } from '../../shared/enums/meio-pagamento-enum';
import { DetalhesCartao, MeioPagamentoCartao } from '../../shared/models/detalhes-cartao';
import { PagamentoPix } from '../../shared/components/pagamento-pix/pagamento-pix';
import { ValoresPedido } from '../../shared/components/valores-pedido/valores-pedido';
import { Message } from '../../shared/components/message/message';

@Component({
  imports: [
    SumarioPedido,
    FormularioCartao,
    RouterLink,
    SeletorMeioPagamento,
    PagamentoPix,
    ValoresPedido,
    Message
  ],
  selector: 'app-pagamento-page',
  templateUrl: './pagamento-page.html',
})
export class PagamentoPage implements OnInit {
  readonly store = inject(CheckoutStore);
  protected readonly router = inject(Router);

  carregando = computed<boolean>(() => this.store.carregando());
  erro = computed<boolean>(() => this.store.erro());
  erroDescricao = computed<string | null>(() => this.store.erroDescricao());
  codigoPix = computed(() => this.store.codigoPix());

  processandoPagamento = signal<boolean>(false);

  meioPagamentoSelecionado = signal<MeioPagamentoEnum | null>(null);
  meioPagamentoEnum = MeioPagamentoEnum;

  desabilitarProgressaoPagamento = computed<boolean>(() => {
    const meioPagamento = this.meioPagamentoSelecionado();
    return !meioPagamento;
  });

  ngOnInit(): void {
    this.store.limparDadosPagamento();
  }

  mudarMeioPagamento(novoMeioPagamento: MeioPagamentoEnum): void {
    this.meioPagamentoSelecionado.set(novoMeioPagamento);
    if (novoMeioPagamento === MeioPagamentoEnum.Pix) {
      this.store.gerarCodigoPix();
    }
  }

  enviarDadosCartao(detalhesCartao: DetalhesCartao): void {
    if (this.meioPagamentoSelecionado() === MeioPagamentoEnum.Pix)
      return;
    this.store.enviarDadosCartao(this.meioPagamentoSelecionado() as MeioPagamentoCartao, detalhesCartao);
    this.continuarParaConfirmacao();
  }

  verificarPagamentoPix() {
    if (this.meioPagamentoSelecionado() !== MeioPagamentoEnum.Pix)
      return;
    this.store.validarPagamentoPix();
    this.continuarParaConfirmacao();
  }

  protected continuarParaConfirmacao(): void {
    void this.router.navigate(['/checkout/confirmacao']);
  }

  protected voltarParaPedido(): void {
    void this.router.navigate(['/checkout/pedido']);
  }
}
