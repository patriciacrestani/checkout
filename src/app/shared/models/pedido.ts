import { TipoPlanoEnum } from "../enums/tipo-plano-enum";
import { Produto } from "./produto";

export interface Pedido {
    id: string;
    numeroPedido: string;
    produto: Produto;
    subtotal: number;
    taxas: number;
    valorTotal: number;
    quantidadeUsuarios: number;
    tipoPlano: TipoPlanoEnum;
    data: string;
}