import {PER_UNIVERSITY_PRICES, premiumCountries, getPackagePrice} from "./pricingData";
import {Country, ProgramType} from "../types";

export function getPricePerUniversity(
    selected: Country[],
    program: ProgramType
): number {
    if (selected.length === 1) {
        // Selection is not a package
        const onlySelectedCountry = selected[0]
        return PER_UNIVERSITY_PRICES[onlySelectedCountry.key][program]
    } else {
        // Selection is a package
        const isPackagePremium = selected.some(c => premiumCountries.includes(c))
        const selectedCountriesCount: number = selected.length

        if (isPackagePremium) {
            return getPackagePrice('premium', selectedCountriesCount)
        } else {
            return getPackagePrice('standard', selectedCountriesCount)
        }
    }
}