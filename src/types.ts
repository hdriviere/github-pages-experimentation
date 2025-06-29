export type Country = {
    key: string;
    name: string;
    label: string;
    flag: string;
    tier: PackageTier;
};

export type Currency = {
    code: string;
    symbol: string;
    rate: number;
    flag: string;
};

export type Discount = {
    key: string;
    label: string;
    value: number; // percentage
    selectable: boolean;
};

export type PackageTier = 'standard' | 'premium'

export type ProgramType = "foundation" | "bachelor" | "master";