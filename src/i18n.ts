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
            "total": "Итого",
            "china": "Китай",
            "hong_kong": "Гонконг",
            "italy": "Италия",
            "united_kingdom": "Великобритания",
            "united_states_of_america": "Соединённые Штаты Америки",
            "south_korea": "Южная Корея",
            "fast_payment": "Оплата менее чем за 5 дня",
            "fast_payment_eom": "Оплатить до конца месяца",
            "duo_booking": "Бронирование вдвоём (с другом)"
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
            "total": "Total",
            "china": "China",
            "hong_kong": "Hong Kong",
            "italy": "Italy",
            "united_kingdom": "United Kingdom",
            "united_states_of_america": "United States of America",
            "south_korea": "South Korea",
            "fast_payment": "Pay in less than 5 days",
            "fast_payment_eom": "Pay before end of month",
            "duo_booking": "Booking as a duo (with a friend)"
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
            "total": "Total",
            "china": "Chine",
            "hong_kong": "Hong Kong",
            "italy": "Italie",
            "united_kingdom": "Royaume-Uni",
            "united_states_of_america": "États-Unis d'Amérique",
            "south_korea": "Corée du Sud",
            "fast_payment": "Payer en moins de 5 jours",
            "fast_payment_eom": "Payer avant la fin du mois",
            "duo_booking": "Réservation en duo (avec un ami)"
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