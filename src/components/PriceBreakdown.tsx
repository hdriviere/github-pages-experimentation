import React from "react";
import { Country, ProgramType, Currency, BasePriceBreakdownItem } from "../types";
import { useTranslation } from "react-i18next";
import { Calculator, CreditCard, TrendingDown } from "lucide-react";

type Props = {
    selectedCountries: Country[];
    programType: ProgramType;
    basePrice: number;
    basePriceBreakdown: BasePriceBreakdownItem[];
    perUnivPrice: number;
    perUnivCombo: string | null;
    universityCount: number;
    universitiesTotal: number;
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
    basePrice,
    basePriceBreakdown,
    perUnivPrice,
    perUnivCombo,
    universityCount,
    universitiesTotal,
    totalKZT,
    discountPercentage,
    discountedTotal,
    currency,
}) => {
    const { t } = useTranslation();
    
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Cost Breakdown</h3>
                </div>
                <p className="text-blue-100 text-sm">Detailed pricing for your education plan</p>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Selection Summary */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Program Type</span>
                        <span className="font-semibold text-gray-900 capitalize">{t(programType)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Countries</span>
                        <span className="font-semibold text-gray-900">{selectedCountries.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Universities</span>
                        <span className="font-semibold text-gray-900">{universityCount}</span>
                    </div>
                </div>
                
                <hr className="border-gray-200" />
                
                {/* Price Details */}
                <div className="space-y-4">
                    {/* Base Price */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Base Service Fee</span>
                            <span className="font-semibold">{formatKZT(basePrice)}</span>
                        </div>
                        
                        {basePriceBreakdown.length > 0 && (
                            <div className="ml-4 space-y-1">
                                {basePriceBreakdown.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.country.flag} {t(item.country.name)}
                                            {item.discountPercent > 0 && (
                                                <span className="text-green-600 ml-1">(-{item.discountPercent}%)</span>
                                            )}
                                        </span>
                                        <span className="text-gray-700">
                                            {item.discountPercent > 0 ? formatKZT(item.discountedPrice) : formatKZT(item.originalPrice)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* University Applications */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">University Applications</span>
                            <span className="font-semibold">{formatKZT(universitiesTotal)}</span>
                        </div>
                        
                        <div className="ml-4 text-sm text-gray-600">
                            {universityCount} × {formatKZT(perUnivPrice)} per application
                        </div>
                    </div>
                </div>
                
                <hr className="border-gray-200" />
                
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-gray-900">Subtotal</span>
                    <span className="font-bold">{formatKZT(totalKZT)}</span>
                </div>
                
                {/* Discounts */}
                {discountPercentage > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Discounts Applied</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-green-700">Total Savings ({discountPercentage}%)</span>
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
                            <span className="text-lg font-bold text-gray-900">Total Cost</span>
                            <div className="text-sm text-gray-600">in {currency.code}</div>
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
                
                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Get Started Today
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                    * Prices are estimates and may vary based on specific requirements
                </p>
            </div>
        </div>
    );
};