export enum TipoPlanoEnum {
    Mensal = 1,
    Anual = 2
}

export const TipoPlanoEnumDescricao: Record<TipoPlanoEnum, string> = {
    [TipoPlanoEnum.Mensal]: 'Plano Mensal',
    [TipoPlanoEnum.Anual]: 'Plano Anual'
};

export const tiposPlano: { id: TipoPlanoEnum; descricao: string }[] = [
    { id: TipoPlanoEnum.Mensal, descricao: TipoPlanoEnumDescricao[TipoPlanoEnum.Mensal] },
    { id: TipoPlanoEnum.Anual, descricao: TipoPlanoEnumDescricao[TipoPlanoEnum.Anual] }
];