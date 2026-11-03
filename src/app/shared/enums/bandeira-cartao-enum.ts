export enum BandeiraCartaoEnum {
    Visa = 1,
    Mastercard = 2
}

export const BandeiraCartaoEnumDescricao: Record<BandeiraCartaoEnum, string> = {
    [BandeiraCartaoEnum.Visa]: 'Visa',
    [BandeiraCartaoEnum.Mastercard]: 'Mastercard'
};

export const tiposPlano: { id: BandeiraCartaoEnum; descricao: string }[] = [
    { id: BandeiraCartaoEnum.Visa, descricao: BandeiraCartaoEnumDescricao[BandeiraCartaoEnum.Visa] },
    { id: BandeiraCartaoEnum.Mastercard, descricao: BandeiraCartaoEnumDescricao[BandeiraCartaoEnum.Mastercard] }
];