import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CountrySelector } from "./components/CountrySelector";
import { ProgramTypeSelector } from "./components/ProgramTypeSelector";
import { UniversitySlider } from "./components/UniversitySlider";
import { PriceBreakdown } from "./components/PriceBreakdown";
import { DiscountOptions } from "./components/DiscountOptions";
import { getQueryParams, setQueryParams } from "./hooks/useUrlSync";
import {COUNTRIES, CURRENCIES, DISCOUNT_OPTIONS, SURCHARGE_OPTIONS} from "./pricing/pricingData";
import {
    CountryData,
    Currency,
    ProgramType,
    Discount,
    UniversityCount,
    Country,
    PaymentType, Surcharge
} from "./types";
import "./i18n";
import {newGetPricePerUniversity} from "./pricing/pricingUtils.ts";
import {PaymentTypeSelector} from "./components/PaymentTypeSelector.tsx";

const App: React.FC = () => {
    const { i18n } = useTranslation();

    // --- INITIAL STATE FROM URL ---
    const initialParams = getQueryParams();

    const [selectedCountries, setSelectedCountries] = useState<CountryData[]>(
        COUNTRIES.filter((c) => initialParams.countries.includes(c.key))
    );
    const [universityCount, setUniversityCount] = useState<number>(initialParams.universities);

    const [currency, setCurrency] = useState<Currency>(
        CURRENCIES.find((c) => c.code === initialParams.currency) || CURRENCIES[0]
    );
    const [programType, setProgramType] = useState<ProgramType>(
        initialParams.program === "master" ? "master" : initialParams.program === "bachelor" ? "bachelor" : "foundation"
    );
    const [paymentType, setPaymentType] = useState<PaymentType>(initialParams.payment === 'company_installment' ? 'company_installment' : initialParams.payment === '12_months_bank_installment' ? '12_months_bank_installment' : initialParams.payment === '24_months_bank_installment' ? '24_months_bank_installment': 'upfront_payment');

    const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>(() => {
        // 1) start with whatever the URL told you
        const init = Object.values(DISCOUNT_OPTIONS).filter(d =>
            initialParams.discounts.includes(d.key)
        );
        // 2) if we're in upfront mode, ensure upfront_payment is in there
        if (paymentType === "upfront_payment") {
            const onePay = DISCOUNT_OPTIONS.upfront_payment;
            if (!init.some(d => d.key === onePay.key)) {
                init.push(onePay);
            }
        }
        return init;
    });

    const [selectedSurcharges, setSelectedSurcharges] = useState<Surcharge[]>(
        Object.values(SURCHARGE_OPTIONS).filter(s => initialParams.surcharges.includes(s.key))
    );

    const [lang, setLang] = useState<string>(initialParams.lang);

    // --- SYNC STATE TO URL ---
    useEffect(() => {
        setQueryParams({
            lang: lang,
            countries: selectedCountries.map((c) => c.key),
            universities: universityCount,
            program: programType,
            currency: currency.code,
            discounts: selectedDiscounts.map((d) => d.key),
            surcharges: selectedSurcharges.map((s) => s.key),
            payment: paymentType,
        });
    }, [
        selectedCountries,
        universityCount,
        programType,
        currency,
        selectedDiscounts,
        selectedSurcharges,
        paymentType,
    ]);

    // --- SYNC LANGUAGE ---
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    function toUniversityCount(n: number): UniversityCount {
        if (n <= 5) return '5_or_less';
        if (n <= 8) return '6_9';
        return '10_or_more';
    }

    const pricePerUniversity = newGetPricePerUniversity(
        programType,
        toUniversityCount(universityCount),
        selectedCountries.map(c => c.key as Country)
    );

    const totalKZT = pricePerUniversity * universityCount;
    const total = totalKZT * currency.rate;
    const discountPercentage = selectedDiscounts
        .reduce((sum, d) => sum + d.value, 0);
    const surchargePercentage = selectedSurcharges
        .reduce((sum, s) => sum + s.value, 0);
    const discountedAndSurchargedTotal = total - (total * discountPercentage) / 100 + (total * surchargePercentage) / 100;

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
                                    <PaymentTypeSelector
                                        paymentType={paymentType}
                                        setPaymentType={setPaymentType}
                                        setSelectedDiscounts={setSelectedDiscounts}
                                        setSelectedSurcharges={setSelectedSurcharges}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <PriceBreakdown
                                    selectedCountries={selectedCountries}
                                    programType={programType}
                                    paymentType={paymentType}
                                    universityCount={universityCount}
                                    pricePerUniversity={pricePerUniversity}
                                    totalKZT={totalKZT}
                                    discountPercentage={discountPercentage}
                                    surchargePercentage={surchargePercentage}
                                    discountedAndSurchargedTotal={discountedAndSurchargedTotal}
                                    currency={currency}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;