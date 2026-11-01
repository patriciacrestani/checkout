import { MetodoPagamentoEnum } from "../enums/metodo-pagamento.enum";
import { DetalhesCartao } from "./detalhes-cartao";

export type Pagamento = { pedidoId: string; metodoPagamento: MetodoPagamentoEnum; } & (PagamentoPix | PagamentoCartao);

export interface PagamentoPix {
    codigo: string; // TODO tá certo?
}

export interface PagamentoCartao {
    cartao: DetalhesCartao;
}