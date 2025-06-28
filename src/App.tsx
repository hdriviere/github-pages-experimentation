import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CountrySelector } from "./components/CountrySelector";
import { ProgramTypeSelector } from "./components/ProgramTypeSelector";
import { UniversitySlider } from "./components/UniversitySlider";
import { PriceBreakdown } from "./components/PriceBreakdown";
import { DiscountOptions } from "./components/DiscountOptions";
import { Footer } from "./components/Footer";
import {
    newGetBasePrice,
    getPerUniversityPrice,
} from "./pricing/pricingUtils";
import { getQueryParams, setQueryParams } from "./hooks/useUrlSync";
import {COUNTRIES, CURRENCIES, DISCOUNT_OPTIONS} from "./pricing/pricingData";
import { Country, Currency, ProgramType, Discount } from "./types";
import "./i18n";

const App: React.FC = () => {
    const { i18n } = useTranslation();

    // --- INITIAL STATE FROM URL ---
    const initialParams = getQueryParams();

    const [selectedCountries, setSelectedCountries] = useState<Country[]>(
        COUNTRIES.filter((c) => initialParams.countries.includes(c.key))
    );
    const [universityCount, setUniversityCount] = useState<number>(initialParams.universities);
    const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>(
        DISCOUNT_OPTIONS.filter((c) => initialParams.discounts.includes(c.key))
    );
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
            discounts: selectedDiscounts.map((d) => d.key),
        });
    }, [
        selectedCountries,
        universityCount,
        programType,
        currency,
        selectedDiscounts,
    ]);

    // --- SYNC LANGUAGE ---
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    const selectedKeys = selectedCountries.map((c) => c.key);
    const { total: basePrice, items: basePriceBreakdown } = newGetBasePrice(
        selectedCountries,
        programType
    );
    const { price: perUnivPrice, comboKey: perUnivCombo } = getPerUniversityPrice(
        selectedKeys,
        universityCount,
        programType
    );

    const universitiesTotal = perUnivPrice * universityCount;
    const totalKZT = basePrice + universitiesTotal;
    const total = totalKZT * currency.rate;
    const discountPercentage = DISCOUNT_OPTIONS
        .filter((opt) => selectedDiscounts.includes(opt))
        .reduce((sum, opt) => sum + opt.value, 0);
    const discountedTotal = total - (total * discountPercentage) / 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header
                lang={lang}
                setLang={setLang}
                currency={currency}
                setCurrency={setCurrency}
            />
            
            <Hero />
            
            <main className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Configuration Panel */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                                <div className="space-y-8">
                                    <ProgramTypeSelector
                                        programType={programType}
                                        setProgramType={setProgramType}
                                    />
                                    <CountrySelector
                                        selectedCountries={selectedCountries}
                                        setSelectedCountries={setSelectedCountries}
                                    />
                                    <UniversitySlider
                                        universityCount={universityCount}
                                        setUniversityCount={setUniversityCount}
                                    />
                                    <DiscountOptions
                                        selectedDiscounts={selectedDiscounts}
                                        setSelectedDiscounts={setSelectedDiscounts}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                                <PriceBreakdown
                                    selectedCountries={selectedCountries}
                                    programType={programType}
                                    basePrice={basePrice}
                                    basePriceBreakdown={basePriceBreakdown}
                                    perUnivPrice={perUnivPrice}
                                    perUnivCombo={perUnivCombo}
                                    universityCount={universityCount}
                                    universitiesTotal={universitiesTotal}
                                    totalKZT={totalKZT}
                                    discountPercentage={discountPercentage}
                                    discountedTotal={discountedTotal}
                                    currency={currency}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default App;