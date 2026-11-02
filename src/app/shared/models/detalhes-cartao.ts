import { MeioPagamentoEnum } from "../enums/meio-pagamento-enum";

export type MeioPagamentoCartao = MeioPagamentoEnum.Credito | MeioPagamentoEnum.Debito;

export interface DetalhesCartao {
    // metodoPagamento: MeioPagamentoCartao;  TODO: precisa?
    numeroCartao: string;
    nomeCartao: string;
    validade: string;
    cvv: string;
}