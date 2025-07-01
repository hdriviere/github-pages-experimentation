export type CountryData = {
    key: string;
    name: string;
    label: string;
    flag: string;
    tier: PackageType;
};

export type Currency = {
    code: string;
    symbol: string;
    rate: number;
    flag: string;
};

export type SurchargeKey =
    | 'bank_installment'

export interface Surcharge {
    key: SurchargeKey;
    label: string;
    value: number;
}

export type DiscountKey =
    | "upfront_payment"
    | "fast_payment"
    | "testimony";

export interface Discount {
    key: DiscountKey;
    label: string;
    value: number;
    selectable: boolean;
}

export type PaymentType = 'upfront_payment' | InstallmentType

export type InstallmentType = 'company_installment' | '12_months_bank_installment' | '24_months_bank_installment';

export type Country = 'cn' | 'hk' | 'it' | 'gb' | 'us' | 'kr' | 'fr' | 'hu' | 'pl' | 'de' | 'at' | 'nl' | 'es' | 'be' | 'ca' | 'ae' | 'qa' | 'my';

export type PackageType = 'standard' | 'premium';

export type ProgramType = "foundation" | "bachelor" | "master";

export type CountryCount = '1' | '2' | '3' | '4_or_more';

export type UniversityCount = '5_or_less' | '6_9' | '10_or_more';

type PricesFor<C extends CountryCount> =
    C extends '1'
        ? Record<Country, number>
        : Record<PackageType, number>;

export type PricingTable = Record<
    ProgramType,
    Record<
        UniversityCount,
        { [C in CountryCount]: PricesFor<C> }
    >
>;