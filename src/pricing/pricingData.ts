import { Country, Currency, Discount } from "../types";

export const COUNTRIES: Country[] = [
    { key: "cn", name: "china", label: "China", flag: "🇨🇳", tier: 'standard' },
    { key: "hk", name: "hong_kong", label: "Hong Kong", flag: "🇭🇰", tier: 'standard' },
    { key: "it", name: "italy", label: "Italy", flag: "🇮🇹", tier: 'standard' },
    { key: "gb", name: "united_kingdom", label: "United Kingdom", flag: "🇬🇧", tier: 'premium' },
    { key: "us", name: "united_states_of_america", label: "United States of America", flag: "🇺🇸", tier: 'premium' },
    { key: "kr", name: "south_korea", label: "South Korea", flag: "🇰🇷", tier: 'standard' },
    { key: "fr", name: "france", label: "France", flag: "🇫🇷", tier: 'standard' },
    { key: "hu", name: "hungary", label: "Hungary", flag: "🇭🇺", tier: 'standard' },
    { key: "pl", name: "poland", label: "Poland", flag: "🇵🇱", tier: 'standard' },
    { key: "de", name: "germany", label: "Germany", flag: "🇩🇪", tier: 'standard' },
    { key: "at", name: "austria", label: "Austria", flag: "🇦🇹", tier: 'standard' },
    { key: "nl", name: "netherlands", label: "Netherlands", flag: "🇳🇱", tier: 'standard' },
    { key: "es", name: "spain", label: "Spain", flag: "🇪🇸", tier: 'standard' },
    { key: "be", name: "belgium", label: "Belgium", flag: "🇧🇪", tier: 'premium' },
    { key: "ca", name: "canada", label: "Canada", flag: "🇨🇦", tier: 'premium' },
    { key: "ae", name: "uae", label: "UAE", flag: "🇦🇪", tier: 'premium' },
    { key: "qa", name: "qatar", label: "Qatar", flag: "🇶🇦", tier: 'premium' },
    { key: "my", name: "malaysia", label: "Malaysia", flag: "🇲🇾", tier: 'standard' }
];

export const premiumCountries = COUNTRIES.filter(c => c.tier === "premium")
export const standardCountries = COUNTRIES.filter(c => c.tier === "standard")

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
    { key: "more_than_6_university", label: "More than 6 university", value: 15 },
];

export const PER_PACKAGE_PRICES = {
    standard: [240_000, 250_000, 250_000] as const, // index 0⇒2 countries, 1⇒3, 2⇒4
    premium:  [250_000, 260_000, 260_000] as const  // same idea
} as const

export type PackageType = keyof typeof PER_PACKAGE_PRICES

export function getPackagePrice(
    packageType: PackageType,
    countryCount: number
): number {
    const prices = PER_PACKAGE_PRICES[packageType]
    const idx = Math.min(Math.max(countryCount - 2, 0), prices.length - 1)
    return prices[idx]
}

export const PER_UNIVERSITY_PRICES: {
    [key: string]: {
        foundation: number;
        bachelor: number;
        master: number;
    };
} = {
    cn: {
        foundation: 220_000,
            bachelor: 220_000,
            master: 230_000,
    },
    hk: {
        foundation: 220_000,
            bachelor: 220_000,
            master: 230_000,
    },
    it: {
        foundation: 220_000,
            bachelor: 220_000,
            master: 230_000,
    },
    gb: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    us: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    kr: {
        foundation: 220_000,
            bachelor: 220_000,
            master: 235_000,
    },
    fr: {
        foundation: 235_000,
            bachelor: 235_000,
            master: 235_000,
    },
    hu: {
        foundation: 220_000,
            bachelor: 220_000,
            master: 230_000,
    },
    pl: {
        foundation: 200_000,
            bachelor: 200_000,
            master: 230_000,
    },
    de: {
        foundation: 235_000,
            bachelor: 235_000,
            master: 235_000,
    },
    at: {
        foundation: 235_000,
            bachelor: 235_000,
            master: 230_000,
    },
    nl: {
        foundation: 235_000,
            bachelor: 235_000,
            master: 235_000,
    },
    es: {
        foundation: 235_000,
            bachelor: 235_000,
            master: 230_000,
    },
    be: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    ca: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    ae: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    qa: {
        foundation: 270_000,
            bachelor: 270_000,
            master: 260_000,
    },
    my: {
        foundation: 200_000,
            bachelor: 200_000,
            master: 230_000,
    }
};