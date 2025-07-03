import React from "react";
import {CountryData, ProgramType, Currency, PaymentType} from "../types";
import { useTranslation } from "react-i18next";
import {Calculator, TrendingDown, GraduationCap, MapPin, Building2, TrendingUp} from "lucide-react";

type Props = {
    selectedCountries: CountryData[];
    programType: ProgramType;
    paymentType: PaymentType;
    universityCount: number;
    pricePerUniversity: number;
    totalKZT: number;
    discountPercentage: number;
    surchargePercentage: number;
    discountedAndSurchargedTotal: number;
    currency: Currency;
};

function formatKZT(value: number): string {
    return new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value) + " ₸";
}

function formatRUB(value: number): string {
    return new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value) + " ₽";
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
        case "RUB":
            return formatRUB(value);
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
    paymentType,
    universityCount,
    pricePerUniversity,
    totalKZT,
    discountPercentage,
    surchargePercentage,
                                                    discountedAndSurchargedTotal,
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
                {/* Basic Selection Summary - Horizontal with Icons */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Program Type */}
                    <div className="text-center">
                        <div className="bg-indigo-100 p-3 rounded-lg mx-auto w-fit mb-2">
                            <GraduationCap className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm capitalize">{t(programType)}</div>
                    </div>
                    
                    {/* Countries Selected */}
                    <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-lg mx-auto w-fit mb-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{selectedCountries.length}</div>
                    </div>
                    
                    {/* Universities */}
                    <div className="text-center">
                        <div className="bg-purple-100 p-3 rounded-lg mx-auto w-fit mb-2">
                            <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{universityCount}</div>
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

                        {/* Discounts - Single Line */}
                        {discountPercentage > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-green-800">
                                            {t("discounts_applied")} ({discountPercentage}%)
                                        </span>
                                    </div>
                                    <span className="font-semibold text-green-700">
                                        -{formatKZT(totalKZT * discountPercentage / 100)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Service Fee - Single Line */}
                        {surchargePercentage > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-amber-600"/>
                                        <span className="font-medium text-amber-800">
                                            {t("service_fee_applied")} ({surchargePercentage}%)
                                        </span>
                                    </div>
                                    <span className="font-semibold text-amber-700">
                                        +{formatKZT(totalKZT * surchargePercentage / 100)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Final Total / Payment Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50
                border border-blue-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                {t("payment_summary")}
                            </h4>

                            <div className="divide-y divide-gray-200 space-y-4">
                                {/* 1) Up-front */}
                                {paymentType === "upfront_payment" && (
                                    <div className="grid grid-cols-2 items-center py-2">
                                        <span className="text-gray-700">{t("pay_in_full")}</span>
                                        <span className="text-2xl font-bold text-blue-700 text-right">
          {formatCurrency(discountedAndSurchargedTotal, currency)}
        </span>
                                    </div>
                                )}

                                {/* 2) Company (2×50%) */}
                                {paymentType === "company_installment" && (
                                    <>
                                        <div className="grid grid-cols-2 items-center py-2">
          <span className="text-gray-700">
            {t("due_at_signing", {percent: 50})}
          </span>
                                            <span className="text-lg font-semibold text-blue-700 text-right">
            {formatCurrency(discountedAndSurchargedTotal * 0.5, currency)}
          </span>
                                        </div>
                                        <div className="grid grid-cols-2 items-center py-2">
          <span className="text-gray-700">
            {t("due_in_3_months", {percent: 50})}
          </span>
                                            <span className="text-lg font-semibold text-blue-700 text-right">
            {formatCurrency(discountedAndSurchargedTotal * 0.5, currency)}
          </span>
                                        </div>
                                    </>
                                )}

                                {/* 3) Bank Installments (12 or 24) */}
                                {(paymentType === "12_months_bank_installment" ||
                                    paymentType === "24_months_bank_installment") && (() => {
                                    const months =
                                        paymentType === "12_months_bank_installment" ? 12 : 24;
                                    const monthly = discountedAndSurchargedTotal / months;

                                    return (
                                        <>
                                            <div className="grid grid-cols-2 items-center py-2">
                                                <span className="text-gray-700">{t("total_amount")}</span>
                                                <span className="text-2xl font-bold text-blue-700 text-right">
              {formatCurrency(discountedAndSurchargedTotal, currency)}
            </span>
                                            </div>
                                            <div className="grid grid-cols-2 items-center py-2">
            <span className="text-gray-700">
              {t("monthly_payment", {count: months})}
            </span>
                                                <span className="text-lg font-semibold text-blue-700 text-right">
              {formatCurrency(monthly, currency)}
            </span>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Approx. KZT for non-KZT currencies */}
                            {currency.code !== "KZT" && (
                                <div className="mt-4 text-sm text-gray-500">
                                    {t("approx_in_kzt")}:{" "}
                                    {formatKZT(
                                        totalKZT *
                                        (1 -
                                            discountPercentage / 100 +
                                            surchargePercentage / 100)
                                    )}
                                </div>
                            )}
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