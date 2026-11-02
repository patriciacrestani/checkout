import { PathParams } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { RetornoApi } from '../../app/shared/models/retorno-api';
import { Pedido } from '../../app/shared/models/pedido';
import { pedidoDataMock } from '../data/pedido-data-mock';

const obterPedido = http.get<PathParams & { pedidoId: string }>(
    '*/api/Pedido/:pedidoId',
    ({ params }) => {
        const response: RetornoApi<Pedido> = {
            sucesso: true,
            dados: pedidoDataMock,
            mensagem: ''
        };
        return HttpResponse.json(response, { status: 200 });
    }
);

export const pedidoHandlerMock = [
    obterPedido
];