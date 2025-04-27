import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

type Country = {
    key: string;
    label: string;
    flag: string;
};

type Currency = {
    code: string;
    symbol: string;
    rate: number;
    flag: string;
};

type ProgramType = "bachelor" | "master";

const COUNTRIES: Country[] = [
    { key: "cn", label: "China", flag: "🇨🇳" },
    { key: "hk", label: "Hong Kong", flag: "🇭🇰" },
    { key: "it", label: "Italy", flag: "🇮🇹" },
    { key: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { key: "us", label: "United States of America", flag: "🇺🇸" },
    { key: "kr", label: "South Korea", flag: "🇰🇷" }
];

const CURRENCIES: Currency[] = [
    { code: "KZT", symbol: "₸", rate: 1, flag: "🇰🇿" },
    { code: "USD", symbol: "$", rate: 0.0019, flag: "🇺🇸" },
    { code: "EUR", symbol: "€", rate: 0.0017, flag: "🇪🇺" },
    { code: "GBP", symbol: "£", rate: 0.0015, flag: "🇬🇧" }
];

function calculatePrice(
    selectedCountries: Country[],
    universityCount: number,
    programType: ProgramType
): number {
    const basePerCountry = programType === "master" ? 590_000 : 400_000;
    const perUniversity = programType === "master" ? 400_000 : 300_000;
    return (
        selectedCountries.length * basePerCountry +
        universityCount * perUniversity
    );
}

// --- Query Param Helpers ---

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        countries: params.get("countries")?.split(",").filter(Boolean) || [],
        universities: Number(params.get("universities")) || 1,
        program: params.get("program") === "master" ? "master" : "bachelor",
        currency: params.get("currency") || "KZT",
        discount: Number(params.get("discount")) || 1
    };
}

function setQueryParams({
                            countries,
                            universities,
                            program,
                            currency,
                            discount
                        }: {
    countries: string[];
    universities: number;
    program: string;
    currency: string;
    discount: number;
}) {
    const params = new URLSearchParams();
    if (countries.length) params.set("countries", countries.join(","));
    params.set("universities", String(universities));
    params.set("program", program);
    params.set("currency", currency);
    params.set("discount", String(discount));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
}

// --- Main App ---

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    // Initialize state from URL
    const initialParams = getQueryParams();

    const [selectedCountries, setSelectedCountries] = useState<Country[]>(
        COUNTRIES.filter((c) => initialParams.countries.includes(c.key))
    );
    const [universityCount, setUniversityCount] = useState<number>(
        initialParams.universities
    );
    const [discountPercentage, setDiscountPercentage] = useState<number>(
        initialParams.discount
    );
    const [currency, setCurrency] = useState<Currency>(
        CURRENCIES.find((c) => c.code === initialParams.currency) || CURRENCIES[0]
    );
    const [programType, setProgramType] = useState<ProgramType>(
        initialParams.program === "master" ? "master" : "bachelor"
    );

    // Sync state to URL
    useEffect(() => {
        setQueryParams({
            countries: selectedCountries.map((c) => c.key),
            universities: universityCount,
            program: programType,
            currency: currency.code,
            discount: discountPercentage
        });
    }, [
        selectedCountries,
        universityCount,
        programType,
        currency,
        discountPercentage
    ]);

    const handleCountryChange = (country: Country) => {
        setSelectedCountries((prev) =>
            prev.some((c) => c.key === country.key)
                ? prev.filter((c) => c.key !== country.key)
                : prev.length < 6
                    ? [...prev, country]
                    : prev
        );
    };

    const priceKZT = calculatePrice(
        selectedCountries,
        universityCount,
        programType
    );
    const price = priceKZT * currency.rate;
    const discountedPrice = price - (price * discountPercentage) / 100;

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
            {/* Header */}
            <header className="w-full bg-white shadow flex flex-col sm:flex-row items-center justify-between px-4 py-3">
                <div className="text-xl font-bold mb-2 sm:mb-0">Pricing Calculator</div>
                <div className="flex gap-4 items-center">
                    {/* Language Selector */}
                    <div>
                        <label className="font-semibold mr-1">{t("language")}:</label>
                        <select
                            className="border rounded p-1"
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                        >
                            <option value="ru">🇷🇺 {t("russian")}</option>
                            <option value="en">🇺🇸 {t("english")}</option>
                            <option value="fr">🇫🇷 {t("french")}</option>
                            {/* Add more languages here */}
                        </select>
                    </div>
                    {/* Currency Selector */}
                    <div>
                        <label className="font-semibold mr-1">{t("currency")}:</label>
                        <select
                            className="border rounded p-1"
                            value={currency.code}
                            onChange={(e) =>
                                setCurrency(
                                    CURRENCIES.find((c) => c.code === e.target.value) ||
                                    CURRENCIES[0]
                                )
                            }
                        >
                            {CURRENCIES.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.flag} {c.code}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>
            {/* Main Calculator */}
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 m-2 sm:m-8">
                    {/* Program Type */}
                    <div className="mb-6">
                        <div className="font-semibold mb-2">{t("program_type")}:</div>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="programType"
                                    value="bachelor"
                                    checked={programType === "bachelor"}
                                    onChange={() => setProgramType("bachelor")}
                                />
                                {t("bachelor")}
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="programType"
                                    value="master"
                                    checked={programType === "master"}
                                    onChange={() => setProgramType("master")}
                                />
                                {t("master")}
                            </label>
                        </div>
                    </div>
                    {/* Country Selection */}
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
                                    {c.flag + " " + c.label}
                                </label>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {selectedCountries.length} / 6 {t("selected")}
                        </div>
                    </div>
                    {/* University Count */}
                    <div className="mb-8">
                        <label className="block font-semibold mb-1">
                            {t("number_of_universities")}: {universityCount}
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={20}
                            value={universityCount}
                            onChange={(e) => setUniversityCount(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    {/* Total Price */}
                    <div className="text-center text-2xl font-bold bg-blue-100 rounded p-6 mb-8">
                        {t("total_price")}: {currency.symbol}
                        {price.toFixed(2)} {currency.code}
                    </div>
                    {/* Discount */}
                    <div className="mb-8">
                        <label className="block font-semibold mb-1">
                            {t("percentage_of_discount")}: {discountPercentage}
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    {/* Discounted Price */}
                    <div className="text-center text-2xl font-bold bg-blue-100 rounded p-6">
                        {t("discounted_price")}: {currency.symbol}
                        {discountedPrice.toFixed(2)} {currency.code}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
