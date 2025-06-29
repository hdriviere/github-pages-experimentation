import React from "react";
import { Country, ProgramType, Currency } from "../types";
import { useTranslation } from "react-i18next";
import { Calculator, TrendingDown } from "lucide-react";

type Props = {
    selectedCountries: Country[];
    programType: ProgramType;
    universityCount: number;
    pricePerUniversity: number;
    totalKZT: number;
    discountPercentage: number;
    discountedTotal: number;
    currency: Currency;
};

function formatKZT(value: number): string {
    return new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value) + " ₸";
}

function formatUSD(value: number): string {
    return "$" + value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatEUR(value: number): string {
    return value.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + " €";
}

function formatGBP(value: number): string {
    return "£" + value.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatCurrency(value: number, currency: Currency): string {
    switch (currency.code) {
        case "KZT":
            return formatKZT(value);
        case "USD":
            return formatUSD(value);
        case "EUR":
            return formatEUR(value);
        case "GBP":
            return formatGBP(value);
        default:
            return currency.symbol + value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
    }
}

export const PriceBreakdown: React.FC<Props> = ({
    selectedCountries,
    programType,
    universityCount,
    pricePerUniversity,
    totalKZT,
    discountPercentage,
    discountedTotal,
    currency,
}) => {
    const { t } = useTranslation();
    
    const hasCountriesSelected = selectedCountries.length > 0;
    const universitiesTotal = pricePerUniversity * universityCount;
    
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{t("cost_breakdown")}</h3>
                </div>
                <p className="text-blue-100 text-sm">{t("detailed_pricing_education_plan")}</p>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Basic Selection Summary - Always Visible */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{t("program_type_label")}</span>
                        <span className="font-semibold text-gray-900 capitalize">{t(programType)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{t("countries_selected")}</span>
                        <span className="font-semibold text-gray-900">{selectedCountries.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{t("universities_to_apply")}</span>
                        <span className="font-semibold text-gray-900">{universityCount}</span>
                    </div>
                </div>
                
                {/* Detailed Breakdown - Only visible when countries are selected */}
                {hasCountriesSelected && (
                    <>
                        <hr className="border-gray-200" />
                        
                        {/* Selected Countries as Small Tag Tiles */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">{t("selected_countries")}</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedCountries.map((country) => (
                                    <div 
                                        key={country.key} 
                                        className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs"
                                    >
                                        <span className="text-sm">{country.flag}</span>
                                        <span className="font-medium text-gray-700">{t(country.name)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <hr className="border-gray-200" />
                        
                        {/* University Applications */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{t("university_applications")}</span>
                                <span className="font-semibold">{formatKZT(universitiesTotal)}</span>
                            </div>
                            
                            <div className="ml-4 text-sm text-gray-600">
                                {universityCount} × {formatKZT(pricePerUniversity)} {t("per_application")}
                            </div>
                        </div>
                        
                        <hr className="border-gray-200" />
                        
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-semibold text-gray-900">{t("subtotal")}</span>
                            <span className="font-bold">{formatKZT(totalKZT)}</span>
                        </div>
                        
                        {/* Discounts */}
                        {discountPercentage > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-800">{t("discounts_applied")}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-green-700">{t("total_savings")} ({discountPercentage}%)</span>
                                    <span className="font-semibold text-green-700">
                                        -{formatCurrency((totalKZT * currency.rate * discountPercentage) / 100, currency)}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        {/* Final Total */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-lg font-bold text-gray-900">{t("total_cost")}</span>
                                    <span className="text-sm text-gray-600 ml-2">{t("in_currency")} {currency.code}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-700">
                                        {formatCurrency(discountedTotal, currency)}
                                    </div>
                                    {currency.code !== "KZT" && (
                                        <div className="text-sm text-gray-600">
                                            ≈ {formatKZT(totalKZT * (1 - discountPercentage / 100))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
                {/* Message when no countries selected */}
                {!hasCountriesSelected && (
                    <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">
                            <Calculator className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-500 font-medium">{t("select_countries_to_see_pricing")}</p>
                        <p className="text-sm text-gray-400 mt-1">{t("choose_study_destinations")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};