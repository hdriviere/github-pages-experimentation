import React from "react";
import {Country, ProgramType, Currency, BasePriceBreakdownItem} from "../types";
import { useTranslation } from "react-i18next";

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
    // Dot as thousands separator, no decimals, symbol after
    return new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value) + " ₸";
}

function formatUSD(value: number): string {
    // Comma as thousands separator, dot as decimal, symbol before
    return (
        "$" +
        value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    );
}

function formatEUR(value: number): string {
    // Space as thousands separator, comma as decimal, symbol after
    return (
        value
            .toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + " €"
    );
}

function formatGBP(value: number): string {
    // Comma as thousands separator, dot as decimal, symbol before
    return (
        "£" +
        value.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    );
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
            return (
                currency.symbol +
                value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            );
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
        <div className="mt-8 p-4 bg-gray-50 rounded">
            <div className="font-bold mb-2">{t("selection_details")}:</div>
            <div>
                <strong>{t("program_type")}:</strong> {t(programType)}
            </div>
            <div>
                <strong>{t("countries")}:</strong>{" "}
                {selectedCountries.length === 0
                    ? t("none")
                    : selectedCountries.map((c) => `${c.flag} ${t(c.name)}`).join(", ")}
            </div>
            <div>
                <strong>{t("base_price")}:</strong> {formatKZT(basePrice)}
                <ul className="ml-4 list-disc">
                    {basePriceBreakdown.map((item, i) => (
                        <li key={i}>
                            {item.country.flag} {t(item.country.name)}: {formatKZT(item.originalPrice)}
                            {item.discountPercent > 0 && (
                                <>
                                    {" "}
                                    -{item.discountPercent}% = {formatKZT(item.discountedPrice)}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>{t("universities")}:</strong> {universityCount}
            </div>
            <div>
                <strong>{t("per_university_price")}:</strong>{" "}
                {perUnivCombo && perUnivCombo !== "default"
                    ? `${t("special_price_for")} [${perUnivCombo.replace(/-/g, ", ")}]: ${formatKZT(perUnivPrice)}`
                    : formatKZT(perUnivPrice)}
            </div>
            <div>
                <strong>{t("universities_total")}:</strong> {formatKZT(universitiesTotal)}
            </div>
            <div>
                <strong>{t("subtotal")}:</strong> {formatKZT(totalKZT)}
            </div>
            <div>
                <strong>{t("discount")}:</strong> {discountPercentage}%
            </div>
            <div>
                <strong>{t("total")}: ({currency.code}):</strong>{" "}
                {formatCurrency(discountedTotal, currency)}
            </div>
        </div>
    );
};
