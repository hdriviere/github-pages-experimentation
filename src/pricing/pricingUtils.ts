import {BASE_PRICES, SPECIAL_BASE_PRICES, PER_UNIVERSITY_PRICES, BASE_PRICE_DISCOUNTS} from "./pricingData";
import {BasePriceBreakdown, BasePriceBreakdownItem, Country, ProgramType} from "../types";

export function getWildcardComboKey<T>(
    selectedKeys: string[],
    wildcardLength: number,
    priceMap: Record<string, T>
): string | null {
    if (selectedKeys.length === wildcardLength) {
        const sorted = [...selectedKeys].sort();
        for (let i = 0; i < sorted.length; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                const pair = [sorted[i], sorted[j]].join("-");
                const wildcardKey = `${pair}-*`;
                if (priceMap[wildcardKey]) {
                    return wildcardKey;
                }
            }
        }
    }
    return null;
}

export function getBasePrice(
    selectedKeys: string[],
    programType: ProgramType
): { price: number; comboKey: string | null } {
    const sorted = [...selectedKeys].sort();
    const comboKey = sorted.join("-");
    if (SPECIAL_BASE_PRICES[comboKey]) {
        return { price: SPECIAL_BASE_PRICES[comboKey][programType], comboKey };
    }
    const wildcardKey = getWildcardComboKey(sorted, 3, SPECIAL_BASE_PRICES);
    if (wildcardKey && SPECIAL_BASE_PRICES[wildcardKey]) {
        return { price: SPECIAL_BASE_PRICES[wildcardKey][programType], comboKey: wildcardKey };
    }
    return {
        price: sorted.reduce((sum, key) => sum + (BASE_PRICES[key]?.[programType] || 0), 0),
        comboKey: null,
    };
}

export function newGetBasePrice(
    selectedCountries: Country[],
    programType: ProgramType
): BasePriceBreakdown {
    if (selectedCountries.length === 0) {
        return { total: 0, items: [] };
    }

    // Get prices for each country
    const countryPrices = selectedCountries.map((c) => ({
        country: c,
        originalPrice: BASE_PRICES[c.key][programType],
    }));

    // Sort by price descending
    countryPrices.sort((a, b) => b.originalPrice - a.originalPrice);

    const items: BasePriceBreakdownItem[] = countryPrices.map((item, idx) => {
        const discountPercent = BASE_PRICE_DISCOUNTS[idx] || 0;
        const discountedPrice = Math.round(
            item.originalPrice * (1 - discountPercent / 100)
        );
        return {
            country: item.country,
            originalPrice: item.originalPrice,
            discountPercent,
            discountedPrice,
        };
    });

    const total = items.reduce((sum, item) => sum + item.discountedPrice, 0);

    return { total, items };
}

export function getPerUniversityPrice(
    selectedKeys: string[],
    universityCount: number,
    programType: ProgramType
): { price: number; comboKey: string | null } {
    const sorted = [...selectedKeys].sort();
    const comboKey = sorted.join("-");
    if (PER_UNIVERSITY_PRICES[comboKey]) {
        const rule = PER_UNIVERSITY_PRICES[comboKey][programType].find((r) => universityCount <= r.max);
        return { price: rule?.price || 0, comboKey };
    }
    const wildcardKey = getWildcardComboKey(sorted, 3, PER_UNIVERSITY_PRICES);
    if (wildcardKey && PER_UNIVERSITY_PRICES[wildcardKey]) {
        const rule = PER_UNIVERSITY_PRICES[wildcardKey][programType].find((r) => universityCount <= r.max);
        return { price: rule?.price || 0, comboKey: wildcardKey };
    }
    const rule = PER_UNIVERSITY_PRICES["default"][programType].find((r) => universityCount <= r.max);
    return { price: rule?.price || 0, comboKey: "default" };
}
