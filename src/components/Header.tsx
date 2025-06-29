import React from "react";
import { Currency } from "../types";
import { CURRENCIES } from "../pricing/pricingData";
import { useTranslation } from "react-i18next";
import { GraduationCap, Globe, DollarSign } from "lucide-react";

type Props = {
    lang: string;
    setLang: (lang: string) => void;
    currency: Currency;
    setCurrency: (currency: Currency) => void;
};

export const Header: React.FC<Props> = ({ lang, setLang, currency, setCurrency }) => {
    const { t } = useTranslation();
    
    return (
        <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                {t("study_abroad")}
                            </h1>
                            <p className="text-sm text-gray-600 font-medium">{t("with_aray_azemkhan")}</p>
                        </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {/* Language Selector */}
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-600" />
                            <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                            >
                                <option value="ru">🇷🇺 {t("russian")}</option>
                                <option value="en">🇺🇸 {t("english")}</option>
                                <option value="fr">🇫🇷 {t("french")}</option>
                            </select>
                        </div>
                        
                        {/* Currency Selector */}
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                                value={currency.code}
                                onChange={(e) =>
                                    setCurrency(
                                        CURRENCIES.find((c) => c.code === e.target.value) || CURRENCIES[0]
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
                </div>
            </div>
        </header>
    );
};