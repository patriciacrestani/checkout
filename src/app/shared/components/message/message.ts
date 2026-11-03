import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type EstadoMessage = 'sucesso' | 'erro';

@Component({
  selector: 'app-message',
  templateUrl: './message.html',
  host: { class: 'block min-w-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Message {
  readonly texto = input.required<string>();
  readonly estado = input.required<EstadoMessage>();
}
