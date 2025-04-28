import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ru: {
        translation: {
            "pricing_calculator": "Калькулятор стоимости",
            "language": "Язык",
            "russian": "Русский",
            "english": "Английский",
            "french": "Французский",
            "currency": "Валюта",
            "program_type": "Тип программы",
            "bachelor": "Бакалавриат",
            "master": "Магистратура",
            "select_countries": "Выберите страны",
            "selected": "выбрано",
            "number_of_universities": "Количество университетов",
            "percentage_of_discount": "Процент скидки",
            "selection_details": "Детали выбора",
            "countries": "Страны",
            "none": "Нет",
            "base_price": "Базовая стоимость",
            "special_price_for": "Специальная цена для",
            "universities": "Университеты",
            "per_university_price": "Цена за университет",
            "universities_total": "Итого за университеты",
            "subtotal": "Промежуточный итог",
            "discount": "Скидка",
            "total": "Итого"
        }
    },
    en: {
        translation: {
            "pricing_calculator": "Pricing Calculator",
            "language": "Language",
            "russian": "Russian",
            "english": "English",
            "french": "French",
            "currency": "Currency",
            "program_type": "Program type",
            "bachelor": "Bachelor",
            "master": "Master",
            "select_countries": "Select countries",
            "selected": "selected",
            "number_of_universities": "Number of universities",
            "percentage_of_discount": "Percentage of discount",
            "selection_details": "Selection Details",
            "countries": "Countries",
            "none": "None",
            "base_price": "Base price",
            "special_price_for": "Special price for",
            "universities": "Universities",
            "per_university_price": "Per university price",
            "universities_total": "Universities total",
            "subtotal": "Subtotal",
            "discount": "Discount",
            "total": "Total"
        }
    },
    fr: {
        translation: {
            "pricing_calculator": "Calculateur de prix",
            "language": "Langue",
            "russian": "Russe",
            "english": "Anglais",
            "french": "Français",
            "currency": "Devise",
            "program_type": "Type de programme",
            "bachelor": "Licence",
            "master": "Master",
            "select_countries": "Sélectionnez les pays",
            "selected": "sélectionné(s)",
            "number_of_universities": "Nombre d'universités",
            "percentage_of_discount": "Pourcentage de réduction",
            "selection_details": "Détails de la sélection",
            "countries": "Pays",
            "none": "Aucun",
            "base_price": "Prix de base",
            "special_price_for": "Prix spécial pour",
            "universities": "Universités",
            "per_university_price": "Prix par université",
            "universities_total": "Total universités",
            "subtotal": "Sous-total",
            "discount": "Remise",
            "total": "Total"
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