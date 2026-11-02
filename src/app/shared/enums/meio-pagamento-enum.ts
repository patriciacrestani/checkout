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

export const meiosPagamento: { id: MeioPagamentoEnum; descricao: string }[] = [
    { id: MeioPagamentoEnum.Credito, descricao: MeioPagamentoEnumDescricao[MeioPagamentoEnum.Credito] },
    { id: MeioPagamentoEnum.Debito, descricao: MeioPagamentoEnumDescricao[MeioPagamentoEnum.Debito] },
    { id: MeioPagamentoEnum.Pix, descricao: MeioPagamentoEnumDescricao[MeioPagamentoEnum.Pix] }
];