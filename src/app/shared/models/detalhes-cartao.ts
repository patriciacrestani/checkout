import { MetodoPagamentoEnum } from "../enums/metodo-pagamento.enum";

export type MetodoPagamentoCartao = MetodoPagamentoEnum.Credito | MetodoPagamentoEnum.Debito;

export interface DetalhesCartao {
    metodoPagamento: MetodoPagamentoCartao; // TODO: precisa?
    numeroCartao: number;
    nomeCartao: string;
    validade: string;
    cvv: number;
}