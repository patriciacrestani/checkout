import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-codigo-pix',
  templateUrl: './codigo-pix.html',
  host: { class: 'block min-w-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodigoPix {
  readonly codigoPix = input.required<string>();

  protected readonly mensagem = signal<string | null>(null);
  protected readonly copiando = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private temporizador?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.temporizador));
  }

  protected async copiarCodigo(): Promise<void> {
    if (this.copiando()) return;

    clearTimeout(this.temporizador);
    this.mensagem.set(null);
    this.copiando.set(true);

    let mensagem: string;

    try {
      await navigator.clipboard.writeText(this.codigoPix());
      mensagem = 'Código PIX copiado!';
    } catch {
      mensagem = 'Não foi possível copiar o código pix.';
    }

    if (this.destroyRef.destroyed) return;

    this.copiando.set(false);
    this.mensagem.set(mensagem);
    this.temporizador = setTimeout(() => this.mensagem.set(null), 2000);
  }
}
