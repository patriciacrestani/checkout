import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StepperStep } from './stepper-step';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.html',
  host: { class: 'block w-full' },
})
export class Stepper {
  readonly steps = input.required<readonly StepperStep[]>();
  readonly currentStep = input.required<string | null>();
  readonly label = input('Etapas');

  protected readonly currentIndex = computed(() =>
    this.steps().findIndex((step) => step.id === this.currentStep()),
  );
}
