import { delay, PathParams } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { RetornoApi } from '../../app/shared/models/retorno-api';
import { Pedido } from '../../app/shared/models/pedido';
import { pedidoDataMock } from '../data/pedido-data-mock';
import { Pix } from '../../app/shared/models/pix';
import { pixDataMock } from '../data/pix-data-mock';

const enviarPagamentoCartao = http.get<PathParams & { pedidoId: string }>(
  '*/api/Pagamento/Pagar/:pedidoId/Cartao',
  ({ params }) => {
    const response: RetornoApi<Pedido> = {
      sucesso: true,
      dados: pedidoDataMock,
      mensagem: ''
    };

    // const response: RetornoApi<Pix> = {
    //   sucesso: false,
    //   mensagem: 'Seu banco recusou esta transação. Confira os dados e o limite disponível ou use outro meio de pagamento.'
    // };
    return HttpResponse.json(response, { status: 200 });
  }
);

const obterCodigoPix = http.get<PathParams & { pedidoId: string }>(
  '*/api/Pagamento/Pix/:pedidoId/Codigo',
  async ({ params }) => {
    // await delay(3000);
    const response: RetornoApi<Pix> = {
      sucesso: true,
      dados: pixDataMock,
      mensagem: ''
    };
    // const response: RetornoApi<Pix> = {
    //   sucesso: false,
    //   mensagem: 'Erro ao gerar código Pix.'
    // };
    return HttpResponse.json(response, { status: 200 });
  }
);

const validarPagamentoPix = http.get<PathParams & { pedidoId: string }>(
  '*/api/Pagamento/Pix/:pedidoId/ValidarPagamento',
  ({ params }) => {
    const response: RetornoApi = {
      sucesso: true,
      mensagem: ''
    };
    return HttpResponse.json(response, { status: 200 });
  }
);

export const pagamentoHandlerMock = [
  enviarPagamentoCartao,
  obterCodigoPix,
  validarPagamentoPix
];