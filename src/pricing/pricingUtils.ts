import {PER_UNIVERSITY_PRICES, premiumCountries, getPackagePrice, pricingTable} from "./pricingData";
import {Country, CountryCount, CountryData, PackageType, ProgramType, UniversityCount} from "../types";

export function getPricePerUniversity(
    selected: CountryData[],
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

const premiumCountriesSet = new Set<Country>(
    premiumCountries.map(p => p.key as Country)
);

export function newGetPricePerUniversity(
    programType: ProgramType,
    universityCount: UniversityCount,
    selectedCountries: Country[],
): number {
    const len = selectedCountries.length;

    // ---- 1 country: pick the one country key, idx into the '1'-bucket
    if (len === 1) {
        const country = selectedCountries[0]!; // we know there is exactly 1
        return pricingTable[programType][universityCount]['1'][country];
    }

    // ---- multiple countries: compute CountryCount ('2'|'3'|'4_or_more')
    let countryCount: Exclude<CountryCount, '1'>;
    if (len === 2)      countryCount = '2';
    else if (len === 3) countryCount = '3';
    else                countryCount = '4_or_more';

    // ---- decide standard vs. premium
    const pkgKey: PackageType = selectedCountries.some(c =>
        premiumCountriesSet.has(c)
    )
        ? 'premium'
        : 'standard';

    return pricingTable[programType][universityCount][countryCount][pkgKey];
}