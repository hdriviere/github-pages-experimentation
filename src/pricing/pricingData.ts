import { Country, Currency, Discount } from "../types";

export const COUNTRIES: Country[] = [
    { key: "cn", name: "china", label: "China", flag: "🇨🇳" },
    { key: "hk", name: "hong_kong", label: "Hong Kong", flag: "🇭🇰" },
    { key: "it", name: "italy", label: "Italy", flag: "🇮🇹" },
    { key: "gb", name: "united_kingdom", label: "United Kingdom", flag: "🇬🇧" },
    { key: "us", name: "united_states_of_america", label: "United States of America", flag: "🇺🇸" },
    { key: "kr", name: "south_korea", label: "South Korea", flag: "🇰🇷" },
    { key: "fr", name: "france", label: "France", flag: "🇫🇷" },
    { key: "hu", name: "hungary", label: "Hungary", flag: "🇭🇺" },
    { key: "pl", name: "poland", label: "Poland", flag: "🇵🇱" },
    { key: "de", name: "germany", label: "Germany", flag: "🇩🇪" },
    { key: "at", name: "austria", label: "Austria", flag: "🇦🇹" },
    { key: "nl", name: "netherlands", label: "Netherlands", flag: "🇳🇱" },
    { key: "es", name: "spain", label: "Spain", flag: "🇪🇸" },
    { key: "be", name: "belgium", label: "Belgium", flag: "🇧🇪" },
    { key: "ca", name: "canada", label: "Canada", flag: "🇨🇦" },
    { key: "ae", name: "uae", label: "UAE", flag: "🇦🇪" },
    { key: "qa", name: "qatar", label: "Qatar", flag: "🇶🇦" },
    { key: "my", name: "malaysia", label: "Malaysia", flag: "🇲🇾" }
];

export const CURRENCIES: Currency[] = [
    { code: "KZT", symbol: "₸", rate: 1, flag: "🇰🇿" },
    { code: "USD", symbol: "$", rate: 0.0019, flag: "🇺🇸" },
    { code: "EUR", symbol: "€", rate: 0.0017, flag: "🇪🇺" },
    { code: "GBP", symbol: "£", rate: 0.0015, flag: "🇬🇧" }
];

export const DISCOUNT_OPTIONS: Discount[] = [
    { key: "fast_payment", label: "Pay in less than 5 days", value: 7 },
    { key: "fast_payment_eom", label: "Pay before end of month", value: 5 },
    { key: "duo_booking", label: "Booking as a duo (with a friend)", value: 10 },
    // Add more options as needed
];

export const BASE_PRICE_DISCOUNTS: number[] = [0, 30, 50] // in percent, for 1st, 2nd, 3rd

export const BASE_PRICES: Record<string, { foundation: number; bachelor: number; master: number }> = {
    cn: { foundation: 280_000, bachelor: 340_000, master: 390_000 },
    hk: { foundation: 320_000, bachelor: 400_000, master: 450_000 },
    it: { foundation: 320_000, bachelor: 400_000, master: 440_000 },
    gb: { foundation: 360_000, bachelor: 450_000, master: 470_000 },
    us: { foundation: 360_000, bachelor: 450_000, master: 470_000 },
    kr: { foundation: 300_000, bachelor: 370_000, master: 420_000 },
    fr: { foundation: 340_000, bachelor: 420_000, master: 460_000 },
    hu: { foundation: 280_000, bachelor: 350_000, master: 400_000 },
    pl: { foundation: 290_000, bachelor: 360_000, master: 410_000 },
    de: { foundation: 350_000, bachelor: 430_000, master: 480_000 },
    at: { foundation: 330_000, bachelor: 410_000, master: 450_000 },
    nl: { foundation: 360_000, bachelor: 440_000, master: 490_000 },
    es: { foundation: 310_000, bachelor: 390_000, master: 430_000 },
    be: { foundation: 340_000, bachelor: 420_000, master: 470_000 },
    ca: { foundation: 380_000, bachelor: 460_000, master: 500_000 },
    ae: { foundation: 300_000, bachelor: 380_000, master: 430_000 },
    qa: { foundation: 310_000, bachelor: 390_000, master: 440_000 },
    my: { foundation: 260_000, bachelor: 320_000, master: 370_000 },
};

export const SPECIAL_BASE_PRICES: Record<
    string,
    { foundation: number; bachelor: number; master: number }
> = {
    // "gb-us": { foundation: 600_000, bachelor: 750_000, master: 1_000_000 },
    // "gb-us-*": { foundation: 720_000, bachelor: 900_000, master: 1_200_000 },
    // "cn-hk": { foundation: 560_000, bachelor: 700_000, master: 950_000 },
    // "cn-hk-it": { foundation: 800_000, bachelor: 1_000_000, master: 1_400_000 },
};

export const PER_UNIVERSITY_PRICES: {
    [key: string]: {
        foundation: { max: number; price: number }[];
        bachelor: { max: number; price: number }[];
        master: { max: number; price: number }[];
    };
} = {
    default: {
        foundation: [
            { max: 3, price: 90_000 },
            { max: 6, price: 80_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 65_000 },
        ],
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 6, price: 100_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 85_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 120_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "cn": {
        foundation: [
            { max: 3, price: 90_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
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
        foundation: [
            { max: 3, price: 90_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
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
        foundation: [
            { max: 3, price: 90_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
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
        foundation: [
            { max: 3, price: 110_000 },
            { max: 6, price: 95_000 },
            { max: 9, price: 80_000 },
            { max: Infinity, price: 70_000 },
        ],
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
        foundation: [
            { max: 3, price: 110_000 },
            { max: 6, price: 95_000 },
            { max: 9, price: 80_000 },
            { max: Infinity, price: 70_000 },
        ],
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
        foundation: [
            { max: 3, price: 90_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
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
    "fr": {
        foundation: [
            { max: 3, price: 95_000 },
            { max: 6, price: 85_000 },
            { max: 9, price: 75_000 },
            { max: Infinity, price: 65_000 },
        ],
        bachelor: [
            { max: 3, price: 115_000 },
            { max: 6, price: 105_000 },
            { max: 9, price: 95_000 },
            { max: Infinity, price: 85_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 105_000 },
        ],
    },
    "hu": {
        foundation: [
            { max: 3, price: 85_000 },
            { max: 9, price: 65_000 },
            { max: Infinity, price: 55_000 },
        ],
        bachelor: [
            { max: 3, price: 105_000 },
            { max: 9, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 135_000 },
            { max: 6, price: 115_000 },
            { max: 9, price: 105_000 },
            { max: Infinity, price: 85_000 },
        ],
    },
    "pl": {
        foundation: [
            { max: 3, price: 85_000 },
            { max: 9, price: 65_000 },
            { max: Infinity, price: 55_000 },
        ],
        bachelor: [
            { max: 3, price: 105_000 },
            { max: 9, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 135_000 },
            { max: 6, price: 115_000 },
            { max: 9, price: 105_000 },
            { max: Infinity, price: 85_000 },
        ],
    },
    "de": {
        foundation: [
            { max: 3, price: 105_000 },
            { max: 6, price: 90_000 },
            { max: 9, price: 75_000 },
            { max: Infinity, price: 65_000 },
        ],
        bachelor: [
            { max: 3, price: 125_000 },
            { max: 6, price: 110_000 },
            { max: 9, price: 95_000 },
            { max: Infinity, price: 85_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 105_000 },
        ],
    },
    "at": {
        foundation: [
            { max: 3, price: 100_000 },
            { max: 6, price: 85_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
        bachelor: [
            { max: 3, price: 120_000 },
            { max: 6, price: 105_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 100_000 },
        ],
    },
    "nl": {
        foundation: [
            { max: 3, price: 105_000 },
            { max: 6, price: 90_000 },
            { max: 9, price: 75_000 },
            { max: Infinity, price: 65_000 },
        ],
        bachelor: [
            { max: 3, price: 125_000 },
            { max: 6, price: 110_000 },
            { max: 9, price: 95_000 },
            { max: Infinity, price: 85_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 105_000 },
        ],
    },
    "es": {
        foundation: [
            { max: 3, price: 95_000 },
            { max: 6, price: 80_000 },
            { max: 9, price: 65_000 },
            { max: Infinity, price: 55_000 },
        ],
        bachelor: [
            { max: 3, price: 115_000 },
            { max: 6, price: 100_000 },
            { max: 9, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 135_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 95_000 },
        ],
    },
    "be": {
        foundation: [
            { max: 3, price: 100_000 },
            { max: 6, price: 85_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
        bachelor: [
            { max: 3, price: 120_000 },
            { max: 6, price: 105_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 100_000 },
        ],
    },
    "ca": {
        foundation: [
            { max: 3, price: 115_000 },
            { max: 6, price: 100_000 },
            { max: 9, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        bachelor: [
            { max: 3, price: 135_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 105_000 },
            { max: Infinity, price: 95_000 },
        ],
        master: [
            { max: 3, price: 145_000 },
            { max: 6, price: 130_000 },
            { max: 9, price: 120_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "ae": {
        foundation: [
            { max: 3, price: 90_000 },
            { max: 9, price: 70_000 },
            { max: Infinity, price: 60_000 },
        ],
        bachelor: [
            { max: 3, price: 110_000 },
            { max: 9, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 135_000 },
            { max: 6, price: 120_000 },
            { max: 9, price: 110_000 },
            { max: Infinity, price: 90_000 },
        ],
    },
    "qa": {
        foundation: [
            { max: 3, price: 95_000 },
            { max: 9, price: 75_000 },
            { max: Infinity, price: 65_000 },
        ],
        bachelor: [
            { max: 3, price: 115_000 },
            { max: 9, price: 95_000 },
            { max: Infinity, price: 85_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 125_000 },
            { max: 9, price: 115_000 },
            { max: Infinity, price: 95_000 },
        ],
    },
    "my": {
        foundation: [
            { max: 3, price: 80_000 },
            { max: 9, price: 60_000 },
            { max: Infinity, price: 50_000 },
        ],
        bachelor: [
            { max: 3, price: 100_000 },
            { max: 9, price: 80_000 },
            { max: Infinity, price: 70_000 },
        ],
        master: [
            { max: 3, price: 130_000 },
            { max: 6, price: 110_000 },
            { max: 9, price: 100_000 },
            { max: Infinity, price: 80_000 },
        ],
    },
};