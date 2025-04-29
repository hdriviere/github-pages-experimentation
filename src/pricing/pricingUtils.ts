import { BASE_PRICES, SPECIAL_BASE_PRICES, PER_UNIVERSITY_PRICES } from "./pricingData";
import { ProgramType } from "../types";

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
