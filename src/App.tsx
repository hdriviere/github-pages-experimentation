import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { CountrySelector } from "./components/CountrySelector";
import { ProgramTypeSelector } from "./components/ProgramTypeSelector";
import { UniversitySlider } from "./components/UniversitySlider";
import { DiscountSlider } from "./components/DiscountSlider";
import { PriceBreakdown } from "./components/PriceBreakdown";
import {
    getBasePrice,
    getPerUniversityPrice,
} from "./pricing/pricingUtils";
import { getQueryParams, setQueryParams } from "./hooks/useUrlSync";
import { COUNTRIES, CURRENCIES } from "./pricing/pricingData";
import { Country, Currency, ProgramType } from "./types";
import "./i18n";

const App: React.FC = () => {
    const { i18n } = useTranslation();

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
        });
    }, [
        selectedCountries,
        universityCount,
        programType,
        currency,
        discountPercentage,
    ]);

    // --- SYNC LANGUAGE ---
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

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
            <Header
                lang={lang}
                setLang={setLang}
                currency={currency}
                setCurrency={setCurrency}
            />
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 m-2 sm:m-8">
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
                    <DiscountSlider
                        discountPercentage={discountPercentage}
                        setDiscountPercentage={setDiscountPercentage}
                    />
                    <PriceBreakdown
                        selectedCountries={selectedCountries}
                        programType={programType}
                        basePrice={basePrice}
                        baseCombo={baseCombo}
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
            </main>
        </div>
    );
};

export default App;
