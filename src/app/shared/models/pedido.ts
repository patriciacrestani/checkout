export interface Pedido {
    id: string;
    produtoId: string;
    subtotal: number;
    taxas: number;
    valorTotal: number;
}