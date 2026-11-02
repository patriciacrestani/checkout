import { Pedido } from "../../app/shared/models/pedido";

export const pedidoDataMock: Pedido = {
    id: '1',
    produto: {
        id: '1',
        titulo: 'Nexo Pro',
        caracteristicas: [
            'Projetos e tarefas ilimitados',
            'Relatórios e automações',
            'Suporte prioritário'
        ],
        valor: 79.9,
    },
    subtotal: 79.9,
    taxas: 0,
    valorTotal: 79.9,
}