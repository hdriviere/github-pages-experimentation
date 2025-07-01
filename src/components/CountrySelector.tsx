import React, { useState, useMemo } from "react";
import { CountryData } from "../types";
import { COUNTRIES } from "../pricing/pricingData";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowUpDown } from "lucide-react";

type Props = {
    selectedCountries: CountryData[];
    setSelectedCountries: React.Dispatch<React.SetStateAction<CountryData[]>>;
};

type SortType = "continent" | "quality";

// Define continent mapping
const CONTINENT_MAP: Record<string, string> = {
    cn: "Asia",
    hk: "Asia", 
    kr: "Asia",
    my: "Asia",
    it: "Europe",
    gb: "Europe",
    fr: "Europe",
    hu: "Europe",
    pl: "Europe",
    de: "Europe",
    at: "Europe",
    nl: "Europe",
    es: "Europe",
    be: "Europe",
    us: "North America",
    ca: "North America",
    ae: "Middle East",
    qa: "Middle East"
};

// Define quality ranking (1 = highest quality)
const QUALITY_RANKING: Record<string, number> = {
    us: 1,
    gb: 2,
    ca: 3,
    de: 4,
    nl: 5,
    fr: 6,
    kr: 7,
    cn: 8,
    be: 9,
    at: 10,
    hk: 11,
    ae: 12,
    qa: 13,
    it: 14,
    es: 15,
    hu: 16,
    pl: 17,
    my: 18
};

export const CountrySelector: React.FC<Props> = ({
    selectedCountries,
    setSelectedCountries,
}) => {
    const { t } = useTranslation();
    const [sortType, setSortType] = useState<SortType>("continent");

    const handleCountryChange = (country: CountryData) => {
        setSelectedCountries((prev) =>
            prev.some((c) => c.key === country.key)
                ? prev.filter((c) => c.key !== country.key)
                : prev.length < 6
                ? [...prev, country]
                : prev
        );
    };

    const sortedCountries = useMemo(() => {
        const countries = [...COUNTRIES];
        
        if (sortType === "continent") {
            return countries.sort((a, b) => {
                const continentA = CONTINENT_MAP[a.key] || "Other";
                const continentB = CONTINENT_MAP[b.key] || "Other";
                
                if (continentA !== continentB) {
                    return continentA.localeCompare(continentB);
                }
                
                // Within same continent, sort by country name
                return t(a.name).localeCompare(t(b.name));
            });
        } else {
            // Sort by quality (education ranking)
            return countries.sort((a, b) => {
                const qualityA = QUALITY_RANKING[a.key] || 999;
                const qualityB = QUALITY_RANKING[b.key] || 999;
                return qualityA - qualityB;
            });
        }
    }, [sortType, t]);

    const groupedCountries = useMemo(() => {
        if (sortType === "continent") {
            const groups: Record<string, CountryData[]> = {};
            sortedCountries.forEach(country => {
                const continent = CONTINENT_MAP[country.key] || "Other";
                if (!groups[continent]) {
                    groups[continent] = [];
                }
                groups[continent].push(country);
            });
            return groups;
        }
        return { "All Countries": sortedCountries };
    }, [sortedCountries, sortType]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{t("select_countries")}</h3>
                        <p className="text-sm text-gray-600">{t("choose_up_to_6_destinations")}</p>
                    </div>
                </div>
                
                {/* Sort Toggle */}
                <div className="flex items-center gap-3">
                    <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                                sortType === "continent"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                            onClick={() => setSortType("continent")}
                        >
                            {t("continent")}
                        </button>
                        <button
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                                sortType === "quality"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                            onClick={() => setSortType("quality")}
                        >
                            {t("quality")}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Countries Grid */}
            <div className="space-y-6">
                {Object.entries(groupedCountries).map(([groupName, countries]) => (
                    <div key={groupName}>
                        {sortType === "continent" && (
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                                {t(groupName)}
                            </h4>
                        )}
                        
                        <div className="grid grid-cols-3 gap-3">
                            {countries.map((country) => {
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
                                                <div className="font-medium text-gray-900 text-sm leading-tight">
                                                    {t(country.name)}
                                                </div>
                                                {sortType === "quality" && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        #{QUALITY_RANKING[country.key] || "N/A"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                    {selectedCountries.length} / 6 {t("selected")}
                </span>
                {selectedCountries.length === 6 && (
                    <span className="text-blue-600 font-medium">{t("maximum_reached")}</span>
                )}
            </div>
        </div>
    );
};