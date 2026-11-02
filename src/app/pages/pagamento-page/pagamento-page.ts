import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SumarioPedido } from '../../shared/components/sumario-pedido/sumario-pedido';
import { FormularioCartao } from '../../shared/components/formulario-cartao/formulario-cartao';
import { SeletorMeioPagamento } from '../../shared/components/seletor-meio-pagamento/seletor-meio-pagamento';
import { CheckoutStore } from '../../shared/stores/checkout-store';
import { MeioPagamentoEnum } from '../../shared/enums/meio-pagamento-enum';

@Component({
  imports: [
    SumarioPedido,
    FormularioCartao,
    RouterLink,
    SeletorMeioPagamento
  ],
  selector: 'app-pagamento-page',
  templateUrl: './pagamento-page.html',
})
export class PagamentoPage {
  readonly store = inject(CheckoutStore);
  protected readonly router = inject(Router);

  // protected order = signal<Order | null>(this.orderService.order());
  // protected loadingPixCode = signal<boolean>(false);
  // protected pixCode = signal<PixCode | null>(null);

  meioPagamentoSelecionado = signal<MeioPagamentoEnum | null>(null);
  meioPagamentoEnum = MeioPagamentoEnum;

  mudarMeioPagamento(novoMeioPagamento: MeioPagamentoEnum): void {
    this.meioPagamentoSelecionado.set(novoMeioPagamento);
  }


  // observeSelectedMethod = effect(() => {
  //   const selectedMethod = this.selectedMethod();
  //   untracked(() => {
  //     if (selectedMethod === 'pix') {
  //       this.getPixCode();
  //     }
  //   });
  // });

  // protected selectMethod(method: PaymentMethod): void {
  //   this.selectedMethod.set(method);
  // }

  // private getPixCode() {
  //   this.loadingPixCode.set(true);
  //   const order = this.order();
  //   if (order)
  //     this.paymentService.getPixCode(order.id).subscribe({
  //       next: (response) => this.pixCode.set(response),
  //       error: () => this.pixCode.set(null),
  //       complete: () => this.loadingPixCode.set(false)
  //     });
  // }

  // protected backToOrder(): void {
  //   void this.router.navigate(['/checkout/pedido']);
  // }

  // payPix() {
  //   const order = this.order();
  //   if (order)
  //     this.paymentService.verifyPixPayment(order.id).subscribe({
  //       complete: () => this.redirectToConfirmation()
  //     });
  // }

  // payCard(cardDetails: CardDetails) {
  //   const order = this.order();
  //   if (order)
  //     this.paymentService.verifyCardPayment(order.id, cardDetails).subscribe({
  //       complete: () => this.redirectToConfirmation()
  //     })
  // }

  protected continuarParaConfirmacao(): void {
    void this.router.navigate(['/checkout/confirmacao']);
  }

  protected voltarParaPedido(): void {
    void this.router.navigate(['/checkout/pedido']);
  }
}
