import { MeioPagamentoEnum } from "../enums/meio-pagamento.enum";
import { DetalhesCartao } from "./detalhes-cartao";

export type Pagamento = { pedidoId: string; metodoPagamento: MeioPagamentoEnum; } & (PagamentoPix | PagamentoCartao);

export interface PagamentoPix {
    codigo: string; // TODO tá certo?
}

export interface PagamentoCartao {
    cartao: DetalhesCartao;
}