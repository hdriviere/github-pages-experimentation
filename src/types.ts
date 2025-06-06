export type Country = {
    key: string;
    name: string;
    label: string;
    flag: string;
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
};

export type BasePriceBreakdownItem = {
    country: Country;
    originalPrice: number;
    discountPercent: number; // e.g. 0, 30, 50
    discountedPrice: number;
};

export type BasePriceBreakdown = {
    total: number;
    items: BasePriceBreakdownItem[];
};

export type ProgramType = "bachelor" | "master";
