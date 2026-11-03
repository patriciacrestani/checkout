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
import { DetalhesCartao, MeioPagamentoCartao } from '../models/detalhes-cartao';
import { MeioPagamentoEnum } from '../enums/meio-pagamento-enum';
import { PedidoService } from '../services/pedido/pedido-service';
import { PagamentoService } from '../services/pagamento/pagamento-service';

interface CheckoutState {
    pedido: Pedido | null;
    meioPagamento: MeioPagamentoEnum | null;
    detalhesCartao: DetalhesCartao | null;
    codigoPix: string | null;
    carregando: boolean;
    erro: boolean,
    erroDescricao: string | null;
}

@Injectable()
export class CheckoutStore {
    private readonly pedidoService = inject(PedidoService);
    private readonly pagamentoService = inject(PagamentoService);
    private readonly destroyRef = inject(DestroyRef);

    private requisicao?: Subscription;

    private readonly state = signal<CheckoutState>({
        pedido: null,
        meioPagamento: null,
        detalhesCartao: null,
        codigoPix: null,
        carregando: false,
        erro: false,
        erroDescricao: null,
    });

    readonly pedido = computed(() => this.state().pedido);
    readonly meioPagamento = computed(() => this.state().meioPagamento);
    readonly detalhesCartao = computed(() => this.state().detalhesCartao);
    readonly codigoPix = computed(() => this.state().codigoPix);
    readonly carregando = computed(() => this.state().carregando);
    readonly erro = computed(() => this.state().erro);
    readonly erroDescricao = computed(() => this.state().erroDescricao);

    atualizarMensagemErro(mensagem: string | null): void {
        this.state.update((state) => ({
            ...state,
            carregando: false,
            erro: true,
            erroDescricao: mensagem,
        }));
    }

    limparDadosPagamento() {
        this.state.update((state) => ({
            ...state,
            meioPagamento: null,
            detalhesCartao: null,
            codigoPix: null,
        }));
    }

    carregarPedido(id: string): void {
        this.requisicao?.unsubscribe();

        this.state.set({
            pedido: null,
            meioPagamento: null,
            detalhesCartao: null,
            codigoPix: null,
            carregando: true,
            erro: false,
            erroDescricao: null,
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
                        codigoPix: null,
                        carregando: false,
                        erro: false,
                        erroDescricao: null
                    });
                },
                error: (error) => {
                    this.atualizarMensagemErro(error.mensagem);
                },
            });
    }

    enviarDadosCartao(meioPagamento: MeioPagamentoCartao, dadosCartao: DetalhesCartao): void {
        this.requisicao?.unsubscribe();

        this.state.update((state) => ({
            ...state,
            meioPagamento: meioPagamento,
            detalhesCartao: dadosCartao,
            carregando: true,
        }));

        const pedidoId = this.pedido()?.id;

        if (!pedidoId) {
            this.atualizarMensagemErro('Pedido não encontrado');
            return;
        }

        this.requisicao = this.pagamentoService.enviarPagamentoCartao(pedidoId, meioPagamento, dadosCartao)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    if (!response.sucesso) {
                        this.atualizarMensagemErro(response.mensagem);
                        return;
                    }
                    this.state.update((state) => ({
                        ...state,
                        carregando: false,
                        erro: false
                    }));
                },
                error: (error) => {
                    this.atualizarMensagemErro(error.mensagem);
                },
            });
    }

    gerarCodigoPix(): void {
        if (this.codigoPix() !== null)
            return;

        this.requisicao?.unsubscribe();

        this.state.update((state) => ({
            ...state,
            meioPagamento: MeioPagamentoEnum.Pix,
            carregando: true,
        }));

        const pedidoId = this.pedido()?.id;

        if (!pedidoId) {
            this.atualizarMensagemErro('Pedido não encontrado');
            return;
        }

        this.requisicao = this.pagamentoService.obterCodigoPix(pedidoId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    const pix = response.dados;
                    if (!response.sucesso || !pix) {
                        this.atualizarMensagemErro(response.mensagem);
                        return;
                    }
                    this.state.update((state) => ({
                        ...state,
                        codigoPix: pix.codigo,
                        carregando: false,
                        erro: false
                    }));
                },
                error: (error) => {
                    this.atualizarMensagemErro(error.mensagem);
                },
            });
    }

    validarPagamentoPix(): void {
        this.requisicao?.unsubscribe();

        this.state.update((state) => ({
            ...state,
            carregando: true,
        }));

        const pedidoId = this.pedido()?.id;

        if (!pedidoId) {
            this.atualizarMensagemErro('Pedido não encontrado');
            return;
        }

        this.requisicao = this.pagamentoService.validarPagamentoPix(pedidoId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    if (!response.sucesso) {
                        this.atualizarMensagemErro(response.mensagem);
                        return;
                    }
                    this.state.update((state) => ({
                        ...state,
                        carregando: false,
                        erro: false
                    }));
                },
                error: (error) => {
                    this.atualizarMensagemErro(error.mensagem);
                },
            });
    }

    tentarPagamentoNovamente() {
        if (this.meioPagamento() === MeioPagamentoEnum.Pix) {
            this.validarPagamentoPix();
            return;
        }
        this.enviarDadosCartao(this.meioPagamento() as MeioPagamentoCartao, this.detalhesCartao()!);
    }
}