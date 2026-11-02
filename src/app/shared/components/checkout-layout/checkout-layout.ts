import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Stepper } from '../stepper/stepper';
import { StepperStep } from '../stepper/stepper-step';

@Component({
  imports: [Stepper, RouterOutlet],
  selector: 'app-checkout-layout',
  templateUrl: './checkout-layout.html',
})
export class CheckoutLayout {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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
}
