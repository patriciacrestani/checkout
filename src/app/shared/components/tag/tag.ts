import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type EstadoTag = 'sucesso' | 'erro';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.html',
  host: { class: 'inline-flex min-w-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tag {
  readonly texto = input.required<string>();
  readonly estado = input.required<EstadoTag>();
}
