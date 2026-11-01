import { Routes } from '@angular/router';
import { StepperStep } from './shared/components/stepper/stepper-step';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pedido',
        children: [
            {
                path: 'pedido',
                title: 'Pedido | Checkout',
                data: { checkoutStep: { id: 'order', label: 'Pedido', order: 1 } satisfies StepperStep },
                loadComponent: () => import('./pages/pedido/pedido').then((m) => m.Pedido),
            },
            {
                path: 'pagamento',
                title: 'Pagamento | Checkout',
                data: { checkoutStep: { id: 'payment', label: 'Pagamento', order: 2 } satisfies StepperStep },
                loadComponent: () => import('./pages/pagamento/pagamento').then((m) => m.Pagamento),
            },
            {
                path: 'confirmacao',
                title: 'Confirmação | Checkout',
                data: {
                    checkoutStep: { id: 'confirmation', label: 'Confirmação', order: 3 } satisfies StepperStep,
                },
                // canActivate: [confirmationGuard],
                loadComponent: () =>
                    import('./pages/confirmacao/confirmacao').then((m) => m.Confirmacao),
            },
        ],
    },
    { path: '**', redirectTo: 'pedido' },
];

