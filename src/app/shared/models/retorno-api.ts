export interface RetornoApi<T = any> {
    sucesso: boolean;
    mensagem: string;
    dados?: T;
}