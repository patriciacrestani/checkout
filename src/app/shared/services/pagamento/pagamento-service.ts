import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DetalhesCartao, MeioPagamentoCartao } from '../../models/detalhes-cartao';
import { Observable } from 'rxjs';
import { Pix } from '../../models/pix';
import { RetornoApi } from '../../models/retorno-api';

@Service()
export class PagamentoService {
    private http = inject(HttpClient);

    enviarPagamentoCartao(pedidoId: string, formaPagamentoId: MeioPagamentoCartao, detalhesCartao: DetalhesCartao): Observable<RetornoApi> {
        const dadosParaEnvio = {
            formaPagamentoId,
            detalhesCartao: detalhesCartao.numeroCartao,
        };
        return this.http.post<RetornoApi>(`/api/Pagamento/Pagar/${pedidoId}/Cartao`, dadosParaEnvio);
    }

    obterCodigoPix(pedidoId: string): Observable<RetornoApi<Pix>> {
        return this.http.get<RetornoApi<Pix>>(`/api/Pagamento/Pix/${pedidoId}`);
    }

    validarPagamentoPix(pedidoId: string): Observable<RetornoApi> {
        return this.http.get<RetornoApi>(`/api/Pagamento/Pix/${pedidoId}`);
    }
}
