import { computed, inject, Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth/auth-service';

@Injectable({ providedIn: 'root' })
export class SessaoStore {
  private readonly authService = inject(AuthService);
  private readonly usuarioState = signal<Usuario | null>(null);

  readonly usuario = this.usuarioState.asReadonly();
  readonly autenticado = computed(() => this.usuario() !== null);
  readonly nomeExibicao = computed(() => this.usuario()?.nome ?? '');
  readonly emailExibicao = computed(() => this.usuario()?.email ?? '');

  carregarUsuario(): void {
    this.iniciarSessao(this.authService.obterUsuarioLogado());
  }

  iniciarSessao(usuario: Usuario): void {
    this.usuarioState.set({ ...usuario });
  }

  encerrarSessao(): void {
    this.usuarioState.set(null);
  }
}
