import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { StepperStep } from './shared/components/stepper/stepper-step';
import { Stepper } from './shared/components/stepper/stepper';

@Component({
  imports: [Stepper, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
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
