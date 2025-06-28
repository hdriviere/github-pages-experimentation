import React from "react";
import { Country } from "../types";
import { COUNTRIES } from "../pricing/pricingData";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";

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
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("select_countries")}</h3>
                    <p className="text-sm text-gray-600">Choose up to 6 destinations for your studies</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
                {COUNTRIES.map((country) => {
                    const isSelected = selectedCountries.some((sc) => sc.key === country.key);
                    const isDisabled = !isSelected && selectedCountries.length >= 6;
                    
                    return (
                        <div
                            key={country.key}
                            className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                                isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : isDisabled
                                    ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                            }`}
                            onClick={() => !isDisabled && handleCountryChange(country)}
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="text-2xl">{country.flag}</div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 text-sm leading-tight">{t(country.name)}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                    {selectedCountries.length} / 6 {t("selected")}
                </span>
                {selectedCountries.length === 6 && (
                    <span className="text-blue-600 font-medium">Maximum reached</span>
                )}
            </div>
        </div>
    );
};