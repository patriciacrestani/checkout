import { setupWorker } from 'msw/browser';
import { pagamentoHandlerMock } from './handlers/pagamento-handler-mock';
import { pedidoHandlerMock } from './handlers/pedido-handler-mock';

export const worker = setupWorker(...pagamentoHandlerMock, ...pedidoHandlerMock);