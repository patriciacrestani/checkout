import { MeioPagamentoEnum } from "../enums/meio-pagamento-enum";

export type MeioPagamentoCartao = MeioPagamentoEnum.Credito | MeioPagamentoEnum.Debito;

export interface DetalhesCartao {
    numeroCartao: string;
    nomeCartao: string;
    validade: string;
    cvv: string;
}