import React from "react";
import { Country } from "../types";
import { COUNTRIES } from "../pricing/pricingData";
import { useTranslation } from "react-i18next";

type Props = {
    selectedCountries: Country[];
    setSelectedCountries: React.Dispatch<React.SetStateAction<Country[]>>;
};

export const CountrySelector: React.FC<Props> = ({
                                                     selectedCountries,
                                                     setSelectedCountries,
                                                 }) => {
    const { t } = useTranslation();

    const handleCountryChange = (country: Country) => {
        setSelectedCountries((prev) =>
            prev.some((c) => c.key === country.key)
                ? prev.filter((c) => c.key !== country.key)
                : prev.length < 6
                    ? [...prev, country]
                    : prev
        );
    };

    return (
        <div className="mb-6">
            <div className="font-semibold mb-2">{t("select_countries")}:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COUNTRIES.map((c) => (
                    <label key={c.key} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedCountries.some((sc) => sc.key === c.key)}
                            onChange={() => handleCountryChange(c)}
                            disabled={
                                !selectedCountries.some((sc) => sc.key === c.key) &&
                                selectedCountries.length >= 6
                            }
                        />
                        {c.flag + " " + t(c.name)}
                    </label>
                ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">
                {selectedCountries.length} / 6 {t("selected")}
            </div>
        </div>
    );
};