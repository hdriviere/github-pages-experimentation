import React from "react";
import { Currency } from "../types";
import { CURRENCIES } from "../pricing/pricingData";
import { useTranslation } from "react-i18next";

type Props = {
    lang: string;
    setLang: (lang: string) => void;
    currency: Currency;
    setCurrency: (currency: Currency) => void;
};

export const Header: React.FC<Props> = ({ lang, setLang, currency, setCurrency }) => {
    const { t } = useTranslation();
    return (
        <header className="w-full bg-white shadow flex flex-col sm:flex-row items-center justify-between px-4 py-3">
            <div className="text-xl font-bold mb-2 sm:mb-0">Arailym Azemkhan</div>
            <div className="flex gap-4 items-center">
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
                    </select>
                </div>
                <div>
                    <label className="font-semibold mr-1">{t("currency")}:</label>
                    <select
                        className="border rounded p-1"
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
        </header>
    );
};