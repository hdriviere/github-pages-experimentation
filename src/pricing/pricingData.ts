import {CountryData, Currency, Discount, DiscountKey, PricingTable, Surcharge, SurchargeKey} from "../types";

export const COUNTRIES: CountryData[] = [
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
    { code: "RUB", symbol: "₽", rate: 0.1500, flag: "🇷🇺"},
    { code: "USD", symbol: "$", rate: 0.0019, flag: "🇺🇸" },
    { code: "EUR", symbol: "€", rate: 0.0017, flag: "🇪🇺" }
];

export const DISCOUNT_OPTIONS: Record<DiscountKey, Discount> = {
    upfront_payment: {
        key: "upfront_payment",
        label: "Pay in one payment",
        value: 2,
        selectable: false,
    },
    fast_payment: {
        key: "fast_payment",
        label: "Pay in less than 7 days",
        value: 5,
        selectable: true,
    },
    testimony: {
        key: "testimony",
        label: "Allow to share about their case",
        value: 3,
        selectable: true,
    },
};

export const SURCHARGE_OPTIONS: Record<SurchargeKey, Surcharge> =  {
    bank_installment: { key: "bank_installment", label: "Bank fees for installment", value: 15 },
};

export const pricingTable: PricingTable = {
    foundation: {
        '5_or_less': {
            '1': {
                'cn': 220_000,
                'hk': 220_000,
                'it': 220_000,
                'gb': 270_000,
                'us': 270_000,
                'kr': 220_000,
                'fr': 240_000,
                'hu': 220_000,
                'pl': 220_000,
                'de': 240_000,
                'at': 240_000,
                'nl': 240_000,
                'es': 220_000,
                'be': 240_000,
                'ca': 270_000,
                'ae': 270_000,
                'qa': 270_000,
                'my': 220_000,
            },
            '2': {
                'standard': 240_000,
                'premium': 280_000,
            },
            '3': {
                'standard': 240_000,
                'premium': 280_000,
            },
            '4_or_more': {
                'standard': 245_000,
                'premium': 285_000,
            },
        },
        '6_9': {
            '1': {
                'cn': 210_000,
                'hk': 210_000,
                'it': 210_000,
                'gb': 220_000,
                'us': 220_000,
                'kr': 210_000,
                'fr': 215_000,
                'hu': 210_000,
                'pl': 210_000,
                'de': 215_000,
                'at': 215_000,
                'nl': 215_000,
                'es': 210_000,
                'be': 215_000,
                'ca': 220_000,
                'ae': 220_000,
                'qa': 220_000,
                'my': 210_000,
            },
            '2': {
                'standard': 225_000,
                'premium': 250_000,
            },
            '3': {
                'standard': 225_000,
                'premium': 250_000,
            },
            '4_or_more': {
                'standard': 225_000,
                'premium': 250_000,
            },
        },
        '10_or_more': {
            '1': {
                'cn': 190_000,
                'hk': 190_000,
                'it': 190_000,
                'gb': 190_000,
                'us': 190_000,
                'kr': 190_000,
                'fr': 190_000,
                'hu': 190_000,
                'pl': 190_000,
                'de': 190_000,
                'at': 190_000,
                'nl': 190_000,
                'es': 190_000,
                'be': 190_000,
                'ca': 190_000,
                'ae': 190_000,
                'qa': 190_000,
                'my': 190_000,
            },
            '2': {
                'standard': 210_000,
                'premium': 220_000,
            },
            '3': {
                'standard': 210_000,
                'premium': 220_000,
            },
            '4_or_more': {
                'standard': 210_000,
                'premium': 220_000,
            },
        },
    },
    bachelor: {
        '5_or_less': {
            '1': {
                'cn': 220_000,
                'hk': 220_000,
                'it': 220_000,
                'gb': 270_000,
                'us': 270_000,
                'kr': 220_000,
                'fr': 240_000,
                'hu': 220_000,
                'pl': 220_000,
                'de': 240_000,
                'at': 240_000,
                'nl': 240_000,
                'es': 220_000,
                'be': 240_000,
                'ca': 270_000,
                'ae': 270_000,
                'qa': 270_000,
                'my': 220_000,
            },
            '2': {
                'standard': 240_000,
                'premium': 280_000,
            },
            '3': {
                'standard': 240_000,
                'premium': 280_000,
            },
            '4_or_more': {
                'standard': 245_000,
                'premium': 285_000,
            },
        },
        '6_9': {
            '1': {
                'cn': 210_000,
                'hk': 210_000,
                'it': 210_000,
                'gb': 220_000,
                'us': 220_000,
                'kr': 210_000,
                'fr': 215_000,
                'hu': 210_000,
                'pl': 210_000,
                'de': 215_000,
                'at': 215_000,
                'nl': 215_000,
                'es': 210_000,
                'be': 215_000,
                'ca': 220_000,
                'ae': 220_000,
                'qa': 220_000,
                'my': 210_000,
            },
            '2': {
                'standard': 225_000,
                'premium': 250_000,
            },
            '3': {
                'standard': 225_000,
                'premium': 250_000,
            },
            '4_or_more': {
                'standard': 225_000,
                'premium': 250_000,
            },
        },
        '10_or_more': {
            '1': {
                'cn': 190_000,
                'hk': 190_000,
                'it': 190_000,
                'gb': 190_000,
                'us': 190_000,
                'kr': 190_000,
                'fr': 190_000,
                'hu': 190_000,
                'pl': 190_000,
                'de': 190_000,
                'at': 190_000,
                'nl': 190_000,
                'es': 190_000,
                'be': 190_000,
                'ca': 190_000,
                'ae': 190_000,
                'qa': 190_000,
                'my': 190_000,
            },
            '2': {
                'standard': 210_000,
                'premium': 220_000,
            },
            '3': {
                'standard': 210_000,
                'premium': 220_000,
            },
            '4_or_more': {
                'standard': 210_000,
                'premium': 220_000,
            },
        },
    },
    master: {
        '5_or_less': {
            '1': {
                'cn': 230_000,
                'hk': 230_000,
                'it': 230_000,
                'gb': 260_000,
                'us': 260_000,
                'kr': 230_000,
                'fr': 240_000,
                'hu': 220_000,
                'pl': 220_000,
                'de': 240_000,
                'at': 240_000,
                'nl': 240_000,
                'es': 230_000,
                'be': 240_000,
                'ca': 260_000,
                'ae': 260_000,
                'qa': 260_000,
                'my': 230_000,
            },
            '2': {
                'standard': 245_000,
                'premium': 275_000,
            },
            '3': {
                'standard': 245_000,
                'premium': 280_000,
            },
            '4_or_more': {
                'standard': 245_000,
                'premium': 280_000,
            },
        },
        '6_9': {
            '1': {
                'cn': 210_000,
                'hk': 210_000,
                'it': 210_000,
                'gb': 240_000,
                'us': 240_000,
                'kr': 210_000,
                'fr': 215_000,
                'hu': 210_000,
                'pl': 210_000,
                'de': 215_000,
                'at': 215_000,
                'nl': 215_000,
                'es': 210_000,
                'be': 215_000,
                'ca': 240_000,
                'ae': 240_000,
                'qa': 240_000,
                'my': 210_000,
            },
            '2': {
                'standard': 235_000,
                'premium': 240_000,
            },
            '3': {
                'standard': 235_000,
                'premium': 250_000,
            },
            '4_or_more': {
                'standard': 235_000,
                'premium': 250_000,
            },
        },
        '10_or_more': {
            '1': {
                'cn': 190_000,
                'hk': 190_000,
                'it': 190_000,
                'gb': 225_000,
                'us': 225_000,
                'kr': 190_000,
                'fr': 225_000,
                'hu': 190_000,
                'pl': 190_000,
                'de': 225_000,
                'at': 225_000,
                'nl': 225_000,
                'es': 190_000,
                'be': 225_000,
                'ca': 225_000,
                'ae': 225_000,
                'qa': 225_000,
                'my': 190_000,
            },
            '2': {
                'standard': 230_000,
                'premium': 235_000,
            },
            '3': {
                'standard': 230_000,
                'premium': 235_000,
            },
            '4_or_more': {
                'standard': 230_000,
                'premium': 235_000,
            },
        },
    },
}

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