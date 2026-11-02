import { Produto } from "./produto";

export interface Pedido {
    id: string;
    produto: Produto;
    subtotal: number;
    taxas: number;
    valorTotal: number;
}