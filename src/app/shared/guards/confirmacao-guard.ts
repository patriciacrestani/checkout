import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckoutStore } from '../stores/checkout-store';

export const confirmacaoGuard: CanActivateFn = () => {
  const store = inject(CheckoutStore);
  const router = inject(Router);

  if (store.codigoPix() || store.detalhesCartao()) {
    return true;
  }

  return router.createUrlTree(['/checkout/pagamento']);
};
