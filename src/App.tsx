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

// --- PRICING DATA ---

const BASE_PRICES: Record<string, { bachelor: number; master: number }> = {
    cn: { bachelor: 400_000, master: 590_000 },
    hk: { bachelor: 400_000, master: 590_000 },
    it: { bachelor: 400_000, master: 590_000 },
    gb: { bachelor: 400_000, master: 590_000 },
    us: { bachelor: 400_000, master: 590_000 },
    kr: { bachelor: 400_000, master: 590_000 },
};

const SPECIAL_BASE_PRICES: Record<
    string,
    { bachelor: number; master: number }
> = {
    "gb-us": { bachelor: 750_000, master: 1_000_000 },
    "gb-us-*": { bachelor: 900_000, master: 1_200_000 },
    "cn-hk": { bachelor: 700_000, master: 950_000 },
    "cn-hk-it": { bachelor: 1_000_000, master: 1_400_000 },
    // ...add more as needed
};

const PER_UNIVERSITY_PRICES: {
    [key: string]: {
        bachelor: { max: number; price: number }[];
        master: { max: number; price: number }[];
    };
} = {
    default: {
        bachelor: [
            { max: 3, price: 100_000 },
            { max: 6, price: 90_000 },
            { max: Infinity, price: 80_000 },
        ],
        master: [
            { max: 3, price: 150_000 },
            { max: 6, price: 130_000 },
            { max: Infinity, price: 110_000 },
        ],
    },
    "us-gb-*": {
        bachelor: [
            { max: 3, price: 95_000 },
            { max: 6, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: Infinity, price: 100_000 },
        ],
    },
    "cn-hk": {
        bachelor: [
            { max: 3, price: 95_000 },
            { max: 6, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: Infinity, price: 100_000 },
        ],
    },
    "us-gb": {
        bachelor: [
            { max: 3, price: 95_000 },
            { max: 6, price: 85_000 },
            { max: Infinity, price: 75_000 },
        ],
        master: [
            { max: 3, price: 140_000 },
            { max: 6, price: 120_000 },
            { max: Infinity, price: 100_000 },
        ],
    },
    // ...add more as needed
};

// --- URL SYNC HELPERS ---

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        countries: params.get("countries")?.split("-").filter(Boolean) || [],
        universities: Number(params.get("universities")) || 1,
        program: params.get("program") === "master" ? "master" : "bachelor",
        currency: params.get("currency") || "KZT",
        discount: Number(params.get("discount")) || 0,
        lang: params.get("lang") || "en",
    };
}

function setQueryParams({
                            countries,
                            universities,
                            program,
                            currency,
                            discount,
                            lang,
                        }: {
    countries: string[];
    universities: number;
    program: string;
    currency: string;
    discount: number;
    lang: string;
}) {
    const params = new URLSearchParams();
    if (countries.length) params.set("countries", countries.join("-"));
    params.set("universities", String(universities));
    params.set("program", program);
    params.set("currency", currency);
    params.set("discount", String(discount));
    params.set("lang", lang);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
}

// --- WILDCARD LOGIC ---

function getWildcardComboKey(
    selectedKeys: string[],
    wildcardLength: number,
    priceMap: Record<string, any>
): string | null {
    if (selectedKeys.length === wildcardLength) {
        const sorted = [...selectedKeys].sort();
        // All pairs in the selection
        for (let i = 0; i < sorted.length; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                const pair = [sorted[i], sorted[j]].join("-");
                const wildcardKey = `${pair}-*`;
                if (priceMap[wildcardKey]) {
                    return wildcardKey;
                }
            }
        }
    }
    return null;
}

function getBasePrice(
    selectedKeys: string[],
    programType: ProgramType
): { price: number; comboKey: string | null } {
    const sorted = [...selectedKeys].sort();
    const comboKey = sorted.join("-");
    if (SPECIAL_BASE_PRICES[comboKey]) {
        return { price: SPECIAL_BASE_PRICES[comboKey][programType], comboKey };
    }
    const wildcardKey = getWildcardComboKey(sorted, 3, SPECIAL_BASE_PRICES);
    if (wildcardKey && SPECIAL_BASE_PRICES[wildcardKey]) {
        return { price: SPECIAL_BASE_PRICES[wildcardKey][programType], comboKey: wildcardKey };
    }
    return {
        price: sorted.reduce((sum, key) => sum + (BASE_PRICES[key]?.[programType] || 0), 0),
        comboKey: null,
    };
}

function getPerUniversityPrice(
    selectedKeys: string[],
    universityCount: number,
    programType: ProgramType
): { price: number; comboKey: string | null } {
    const sorted = [...selectedKeys].sort();
    const comboKey = sorted.join("-");
    if (PER_UNIVERSITY_PRICES[comboKey]) {
        const rule = PER_UNIVERSITY_PRICES[comboKey][programType].find((r) => universityCount <= r.max);
        return { price: rule?.price || 0, comboKey };
    }
    const wildcardKey = getWildcardComboKey(sorted, 3, PER_UNIVERSITY_PRICES);
    if (wildcardKey && PER_UNIVERSITY_PRICES[wildcardKey]) {
        const rule = PER_UNIVERSITY_PRICES[wildcardKey][programType].find((r) => universityCount <= r.max);
        return { price: rule?.price || 0, comboKey: wildcardKey };
    }
    const rule = PER_UNIVERSITY_PRICES["default"][programType].find((r) => universityCount <= r.max);
    return { price: rule?.price || 0, comboKey: "default" };
}

// --- MAIN APP ---

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    // --- INITIAL STATE FROM URL ---
    const initialParams = getQueryParams();

    const [selectedCountries, setSelectedCountries] = useState<Country[]>(
        COUNTRIES.filter((c) => initialParams.countries.includes(c.key))
    );
    const [universityCount, setUniversityCount] = useState<number>(initialParams.universities);
    const [discountPercentage, setDiscountPercentage] = useState<number>(initialParams.discount);
    const [currency, setCurrency] = useState<Currency>(
        CURRENCIES.find((c) => c.code === initialParams.currency) || CURRENCIES[0]
    );
    const [programType, setProgramType] = useState<ProgramType>(
        initialParams.program === "master" ? "master" : "bachelor"
    );
    const [lang, setLang] = useState<string>(initialParams.lang);

    // --- SYNC STATE TO URL ---
    useEffect(() => {
        setQueryParams({
            countries: selectedCountries.map((c) => c.key),
            universities: universityCount,
            program: programType,
            currency: currency.code,
            discount: discountPercentage,
            lang,
        });
    }, [
        selectedCountries,
        universityCount,
        programType,
        currency,
        discountPercentage,
        lang,
    ]);

    // --- SYNC LANGUAGE ---
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    const handleCountryChange = (country: Country) => {
        setSelectedCountries((prev) =>
            prev.some((c) => c.key === country.key)
                ? prev.filter((c) => c.key !== country.key)
                : prev.length < 6
                    ? [...prev, country]
                    : prev
        );
    };

    const selectedKeys = selectedCountries.map((c) => c.key);
    const { price: basePrice, comboKey: baseCombo } = getBasePrice(selectedKeys, programType);
    const { price: perUnivPrice, comboKey: perUnivCombo } = getPerUniversityPrice(
        selectedKeys,
        universityCount,
        programType
    );

    const universitiesTotal = perUnivPrice * universityCount;
    const totalKZT = basePrice + universitiesTotal;
    const total = totalKZT * currency.rate;
    const discountedTotal = total - (total * discountPercentage) / 100;

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
            {/* Header */}
            <header className="w-full bg-white shadow flex flex-col sm:flex-row items-center justify-between px-4 py-3">
                <div className="text-xl font-bold mb-2 sm:mb-0">{t("pricing_calculator")}</div>
                <div className="flex gap-4 items-center">
                    {/* Language Selector */}
                    <div>
                        <label className="font-semibold mr-1">{t("language")}:</label>
                        <select
                            className="border rounded p-1"
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
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
                    {/* Detailed Breakdown */}
                    <div className="mt-8 p-4 bg-gray-50 rounded">
                        <div className="font-bold mb-2">{t("selection_details")}:</div>
                        <div>
                            <strong>{t("countries")}:</strong>{" "}
                            {selectedCountries.length === 0
                                ? t("none")
                                : selectedCountries.map((c) => `${c.flag} ${c.label}`).join(", ")}
                        </div>
                        <div>
                            <strong>{t("base_price")}:</strong>{" "}
                            {baseCombo
                                ? `${t("special_price_for")} [${baseCombo.replace(/-/g, ", ")}]: ${basePrice.toLocaleString()} KZT`
                                : selectedCountries.length === 0
                                    ? "—"
                                    : selectedCountries
                                        .map(
                                            (c) =>
                                                `${c.flag} ${c.label}: ${BASE_PRICES[c.key][programType].toLocaleString()} KZT`
                                        )
                                        .join(" + ")}
                        </div>
                        <div>
                            <strong>{t("universities")}:</strong> {universityCount}
                        </div>
                        <div>
                            <strong>{t("per_university_price")}:</strong>{" "}
                            {perUnivCombo && perUnivCombo !== "default"
                                ? `${t("special_price_for")} [${perUnivCombo.replace(/-/g, ", ")}]: ${perUnivPrice.toLocaleString()} KZT`
                                : `${perUnivPrice.toLocaleString()} KZT`}
                        </div>
                        <div>
                            <strong>{t("universities_total")}:</strong> {universitiesTotal.toLocaleString()} KZT
                        </div>
                        <div>
                            <strong>{t("subtotal")}:</strong> {totalKZT.toLocaleString()} KZT
                        </div>
                        <div>
                            <strong>{t("discount")}:</strong> {discountPercentage}%
                        </div>
                        <div>
                            <strong>{t("total")}: ({currency.code}):</strong>{" "}
                            {discountedTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
                            {currency.symbol}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
