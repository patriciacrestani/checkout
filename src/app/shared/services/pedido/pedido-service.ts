import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RetornoApi } from '../../models/retorno-api';
import { Pedido } from '../../models/pedido';

@Service()
export class PedidoService {
    private http = inject(HttpClient);

    obterPedido(pedidoId: string): Observable<RetornoApi<Pedido>> {
        return this.http.get<RetornoApi<Pedido>>(`/api/Pedido/${pedidoId}`);
    }
}
