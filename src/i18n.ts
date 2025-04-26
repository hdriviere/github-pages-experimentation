import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            currency: "Currency",
            language: "Language",
            select_countries: "Select countries",
            number_of_universities: "Number of universities",
            total_price: "Total Price",
            percentage_of_discount: "Percentage of discount",
            discounted_price: "Discounted Price",
            selected: "selected",
            bachelor: "Bachelor",
            master: "Master",
            program_type: "Program type"
        }
    },
    fr: {
        translation: {
            currency: "Devise",
            language: "Langue",
            select_countries: "Sélectionnez les pays",
            number_of_universities: "Nombre d'universités",
            total_price: "Prix total",
            percentage_of_discount: "Pourcentage de réduction",
            discounted_price: "Prix après réduction",
            selected: "sélectionné(s)",
            bachelor: "Licence",
            master: "Master",
            program_type: "Type de programme"
        }
    }
    // Add more languages here
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;