import {
    computed,
    DestroyRef,
    inject,
    Injectable,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { Pedido } from '../models/pedido';
import { DetalhesCartao } from '../models/detalhes-cartao';
import { MeioPagamentoEnum } from '../enums/meio-pagamento-enum';
import { PedidoService } from '../services/pedido/pedido-service';

interface CheckoutState {
    pedido: Pedido | null;
    meioPagamento: MeioPagamentoEnum | null;
    detalhesCartao: DetalhesCartao | null;
    carregando: boolean;
    erro: string | null;
}

@Injectable()
export class CheckoutStore {
    private readonly pedidoService = inject(PedidoService);
    private readonly destroyRef = inject(DestroyRef);

    private requisicao?: Subscription;

    private readonly state = signal<CheckoutState>({
        pedido: null,
        meioPagamento: null,
        detalhesCartao: null,
        carregando: false,
        erro: null,
    });

    readonly pedido = computed(() => this.state().pedido);
    readonly meioPagamento = computed(() => this.state().meioPagamento);
    readonly detalhesCartao = computed(() => this.state().detalhesCartao);
    readonly carregando = computed(() => this.state().carregando);
    readonly erro = computed(() => this.state().erro);

    atualizarMensagemErro(mensagem: string | null): void {
        this.state.update((state) => ({
            ...state,
            carregando: false,
            erro: mensagem,
        }));
    }

    carregarPedido(id: string): void {
        this.requisicao?.unsubscribe();

        this.state.set({
            pedido: null,
            meioPagamento: null,
            detalhesCartao: null,
            carregando: true,
            erro: null,
        });

        this.requisicao = this.pedidoService.obterPedido(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    const pedido = response.dados;
                    if (!response.sucesso || !pedido) {
                        this.atualizarMensagemErro(response.mensagem);
                        return;
                    }
                    this.state.set({
                        pedido: pedido,
                        meioPagamento: null,
                        detalhesCartao: null,
                        carregando: false,
                        erro: null,
                    });
                },
                error: (error) => {
                    this.atualizarMensagemErro(error.mensagem);
                },
            });
    }
}