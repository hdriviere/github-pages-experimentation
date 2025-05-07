import { Country, Currency, Discount } from "../types";

export const COUNTRIES: Country[] = [
    { key: "cn", name: "china", label: "China", flag: "🇨🇳" },
    { key: "hk", name: "hong_kong", label: "Hong Kong", flag: "🇭🇰" },
    { key: "it", name: "italy", label: "Italy", flag: "🇮🇹" },
    { key: "gb", name: "united_kingdom", label: "United Kingdom", flag: "🇬🇧" },
    { key: "us", name: "united_states_of_america", label: "United States of America", flag: "🇺🇸" },
    { key: "kr", name: "south_korea", label: "South Korea", flag: "🇰🇷" }
];

export const CURRENCIES: Currency[] = [
    { code: "KZT", symbol: "₸", rate: 1, flag: "🇰🇿" },
    { code: "USD", symbol: "$", rate: 0.0019, flag: "🇺🇸" },
    { code: "EUR", symbol: "€", rate: 0.0017, flag: "🇪🇺" },
    { code: "GBP", symbol: "£", rate: 0.0015, flag: "🇬🇧" }
];

export const DISCOUNT_OPTIONS: Discount[] = [
    { key: "fast_payment", label: "Pay in less than 3 days", value: 5 },
    { key: "duo_booking", label: "Booking as a duo (with a friend)", value: 10 },
    // Add more options as needed
];

export const BASE_PRICES: Record<string, { bachelor: number; master: number }> = {
    cn: { bachelor: 340_000, master: 390_000 },
    hk: { bachelor: 400_000, master: 450_000 },
    it: { bachelor: 400_000, master: 440_000 },
    gb: { bachelor: 450_000, master: 470_000 },
    us: { bachelor: 450_000, master: 470_000 },
    kr: { bachelor: 370_000, master: 420_000 },
};

export const SPECIAL_BASE_PRICES: Record<
    string,
    { bachelor: number; master: number }
> = {
    "gb-us": { bachelor: 750_000, master: 1_000_000 },
    "gb-us-*": { bachelor: 900_000, master: 1_200_000 },
    "cn-hk": { bachelor: 700_000, master: 950_000 },
    "cn-hk-it": { bachelor: 1_000_000, master: 1_400_000 },
};

export const PER_UNIVERSITY_PRICES: {
    [key: string]: {
        bachelor: { max: number; price: number }[];
        master: { max: number; price: number }[];
    };
} = {
    default: {
        bachelor: [
            { max: 3, price: 100_000 },
            { max: 6, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 150_000 },
            { max: 6, price: 130_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "cn": {
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 90_000 },
        ],
    },
    "hk": {
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 90_000 },
        ],
    },
    "it": {
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 90_000 },
        ],
    },
    "gb": {
        bachelor: [
            { max: 3, price: 130_000 },
            { max: 6, price: 115_000 },
            { max: 9, price: 100_000 },
            { max: Infinity, price: 90_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "us": {
        bachelor: [
            { max: 3, price: 130_000 },
            { max: 6, price: 115_000 },
            { max: 9, price: 100_000 },
            { max: Infinity, price: 90_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "kr": {
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 90_000 },
        ],
    },
};