import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-carregamento',
  templateUrl: './carregamento.html',
  host: { class: 'block min-w-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carregamento {
  readonly titulo = input.required<string>();
  readonly descricao = input<string>();
}
