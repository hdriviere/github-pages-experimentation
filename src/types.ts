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

export type ProgramType = "bachelor" | "master";
