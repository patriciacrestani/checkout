import { Routes } from '@angular/router';
import { StepperStep } from './shared/components/stepper/stepper-step';
import { App } from './app';

export const routes: Routes = [
    {
        path: 'checkout',
        loadComponent: () =>
            import('./shared/components/checkout-layout/checkout-layout').then((m) => m.CheckoutLayout),
        children: [
            {
                path: 'pedido',
                title: 'Pedido | Checkout',
                data: { checkoutStep: { id: 'order', label: 'Pedido', order: 1 } satisfies StepperStep },
                loadComponent: () => import('./pages/pedido-page/pedido-page').then((m) => m.PedidoPage),
            },
            {
                path: 'pagamento',
                title: 'Pagamento | Checkout',
                data: { checkoutStep: { id: 'payment', label: 'Pagamento', order: 2 } satisfies StepperStep },
                loadComponent: () => import('./pages/pagamento-page/pagamento-page').then((m) => m.PagamentoPage),
            },
            {
                path: 'confirmacao',
                title: 'Confirmação | Checkout',
                data: {
                    checkoutStep: { id: 'confirmation', label: 'Confirmação', order: 3 } satisfies StepperStep,
                },
                // TODO: canActivate: [confirmationGuard],
                loadComponent: () =>
                    import('./pages/confirmacao-page/confirmacao-page').then((m) => m.ConfirmacaoPage),
            },
            { path: '**', redirectTo: 'pedido' },

        ],
    },
    { path: '**', redirectTo: 'checkout/pedido' }
]

