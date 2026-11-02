import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { StepperStep } from './shared/components/stepper/stepper-step';
import { Stepper } from './shared/components/stepper/stepper';
import { PedidoService } from './shared/services/pedido/pedido-service';
import { CheckoutStore } from './shared/stores/checkout-store';
import { PagamentoService } from './shared/services/pagamento/pagamento-service';

@Component({
  imports: [Stepper, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  providers: [PagamentoService, PedidoService, CheckoutStore],
})
export class App implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly store = inject(CheckoutStore);

  protected readonly steps = (this.route.routeConfig?.children ?? [])
    .filter((route) => !route.redirectTo && route.data?.['checkoutStep'])
    .map((route) => route.data!['checkoutStep'] as StepperStep)
    .sort((a, b) => a.order - b.order);

  protected readonly currentStep = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(
        () =>
          (this.route.firstChild?.snapshot?.data['checkoutStep'] as StepperStep | undefined)?.id ??
          null,
      ),
    ),
    { initialValue: null },
  );

  ngOnInit(): void {
    // idealmente o id do pedido viria pela rota, mas como a integração é feita com mocks, isso foi simplificado
    const id = this.route.snapshot.paramMap.get('pedidoId') ?? '1';

    if (id) {
      this.store.carregarPedido(id);
    }
  }
}
