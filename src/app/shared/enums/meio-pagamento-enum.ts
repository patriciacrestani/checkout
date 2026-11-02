export enum MeioPagamentoEnum {
    Credito = 1,
    Debito = 2,
    Pix = 3
}

export const MeioPagamentoEnumDescricao: Record<MeioPagamentoEnum, string> = {
    [MeioPagamentoEnum.Credito]: 'Cartão de Crédito',
    [MeioPagamentoEnum.Debito]: 'Cartão de Débito',
    [MeioPagamentoEnum.Pix]: 'Pix'
};