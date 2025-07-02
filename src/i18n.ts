import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ru: {
        translation: {
            // Header & Navigation
            study_abroad: "Образование за рубежом",
            with_aray_azemkhan: "с Арай Аземхан",
            russian: "Русский",
            english: "Английский",
            french: "Французский",

            // Hero Section
            your_journey_to: "Ваш путь к",
            world_class_education: "Образованию мирового класса",
            hero_description:
                "Рассчитайте персонализированную стоимость обучения за рубежом и откройте для себя возможности в лучших университетах мира. Начните планировать свое международное образование уже сегодня.",
            universities_stat: "Университетов",
            students_helped_stat: "Студентов помогли",
            countries_stat: "Стран",
            success_rate_stat: "Успешность",

            // Program Types
            program_type: "Тип программы",
            select_desired_degree: "Выберите желаемый уровень степени",
            foundation: "Фаундейшн",
            foundation_description: "Подготовительная программа (1 год)",
            bachelor: "Бакалавриат",
            bachelor_description: "Степень бакалавра (3-4 года)",
            master: "Магистратура",
            master_description: "Степень магистра (1-2 года)",

            // Country Selection
            select_countries: "Выберите страны",
            choose_up_to_6_destinations: "Выберите до 6 направлений для обучения",
            continent: "Континент",
            quality: "Качество",
            selected: "выбрано",
            maximum_reached: "Достигнут максимум",

            // Continents
            Asia: "Азия",
            Europe: "Европа",
            "North America": "Северная Америка",
            "Middle East": "Ближний Восток",

            // Countries
            china: "Китай",
            hong_kong: "Гонконг",
            italy: "Италия",
            united_kingdom: "Великобритания",
            united_states_of_america: "Соединённые Штаты Америки",
            south_korea: "Южная Корея",
            france: "Франция",
            hungary: "Венгрия",
            poland: "Польша",
            germany: "Германия",
            austria: "Австрия",
            netherlands: "Нидерланды",
            spain: "Испания",
            belgium: "Бельгия",
            canada: "Канада",
            uae: "ОАЭ",
            qatar: "Катар",
            malaysia: "Малайзия",

            // University Selection
            number_of_universities: "Количество университетов",
            how_many_universities_apply:
                "Сколько университетов желаете охватить?",
            universities: "Университеты",
            recommended_text:
                "Рекомендуется: Подавайте заявления в 5-8 университетов для лучших шансов на поступление",

            // Discounts (special offers)
            special_offers: "Специальные предложения",
            save_money_exclusive_discounts:
                "Экономьте деньги с нашими эксклюзивными скидками",
            more_than_5_university: "Выбор более 5 университетов",
            fast_payment: "Оплата менее чем за 7 дней",
            fast_payment_eom: "Быстрая оплата до конца месяца",
            testimony: "Разрешение поделиться своим кейсом",
            duo_booking: "Бронирование вдвоём (с другом)",

            // Payment Type Selector
            payment_type: "Тип оплаты",
            select_desired_payment: "Выберите способ оплаты",
            upfront_payment: "Полная оплата",
            upfront_payment_description:
                "Оплатить полную стоимость единовременно",
            installment: "Рассрочка",
            installment_description:
                "Оплатить частями по заранее заданному графику",

            // Installment Type Selector
            installment_type: "Тип рассрочки",
            select_desired_installment: "Выберите желаемый план рассрочки",
            company: "Рассрочка от компании",
            company_description: "Оплата в две равные части через компанию",
            bank_12: "Банковская рассрочка 12 мес.(только для КЗ)",
            bank_12_description: "Оплата в 12 ежемесячных взносов",
            bank_24: "Банковская рассрочка 24 мес.(только для КЗ)",
            bank_24_description: "Оплата в 24 ежемесячных взносов",

            // Price Breakdown
            cost_breakdown: "Разбивка стоимости",
            detailed_pricing_education_plan: "Стоимость полного сопровождения",
            program_type_label: "Тип программы",
            countries_selected: "Выбрано стран",
            universities_to_apply: "Университетов для подачи заявлений",
            selected_countries: "Выбранные страны",
            university_applications: "Подачи в университеты",
            per_application: "за подачу",
            subtotal: "Общая цена",
            discounts_applied: "Спец. условия",
            service_fee_applied: "Сервисный сбор",
            payment_summary: "Сводка платежей",
            pay_in_full: "Оплатить полностью",
            due_at_signing: "Оплата при подписании ({{percent}}%)",
            due_in_3_months: "Оплата в течение следующих 3 месяцев ({{percent}}%)",
            total_amount: "Общая сумма",
            monthly_payment: "Ежемесячный платёж ({{count}} месяцев)",
            approx_in_kzt: "Примерно в тенге",

            total_savings: "Общая экономия",
            total_cost: "Итого",
            in_currency: "в",
            select_countries_to_see_pricing:
                "Выберите страны, чтобы увидеть подробную стоимость",
            choose_study_destinations:
                "Выберите направления для обучения, чтобы рассчитать стоимость",

            // Tiers
            standard: "стандарт",
            premium: "премиум",

            // General
            currency: "Валюта",
            language: "Язык",
            total: "Итого",
            discount: "Скидка",
        },
    },

    en: {
        translation: {
            // Header & Navigation
            study_abroad: "Study Abroad",
            with_aray_azemkhan: "with Aray Azemkhan",
            russian: "Russian",
            english: "English",
            french: "French",

            // Hero Section
            your_journey_to: "Your Journey to",
            world_class_education: "World-Class Education",
            hero_description:
                "Calculate personalized costs for studying abroad and discover opportunities at top universities worldwide. Start planning your international education today.",
            universities_stat: "Universities",
            students_helped_stat: "Students Helped",
            countries_stat: "Countries",
            success_rate_stat: "Success Rate",

            // Program Types
            program_type: "Program Type",
            select_desired_degree: "Select your desired degree level",
            foundation: "Foundation",
            foundation_description: "Preparatory program (1 year)",
            bachelor: "Bachelor",
            bachelor_description: "Undergraduate degree (3-4 years)",
            master: "Master",
            master_description: "Graduate degree (1-2 years)",

            // Country Selection
            select_countries: "Select Countries",
            choose_up_to_6_destinations:
                "Choose up to 6 destinations for your studies",
            continent: "Continent",
            quality: "Quality",
            selected: "selected",
            maximum_reached: "Maximum reached",

            // Continents
            Asia: "Asia",
            Europe: "Europe",
            "North America": "North America",
            "Middle East": "Middle East",

            // Countries
            china: "China",
            hong_kong: "Hong Kong",
            italy: "Italy",
            united_kingdom: "United Kingdom",
            united_states_of_america: "United States of America",
            south_korea: "South Korea",
            france: "France",
            hungary: "Hungary",
            poland: "Poland",
            germany: "Germany",
            austria: "Austria",
            netherlands: "Netherlands",
            spain: "Spain",
            belgium: "Belgium",
            canada: "Canada",
            uae: "UAE",
            qatar: "Qatar",
            malaysia: "Malaysia",

            // University Selection
            number_of_universities: "Number of Universities",
            how_many_universities_apply:
                "How many universities do you want to apply to?",
            universities: "Universities",
            recommended_text:
                "Recommended: Apply to 5-8 universities for the best chances of acceptance",

            // Discounts
            special_offers: "Special Offers",
            save_money_exclusive_discounts:
                "Save money with our exclusive discounts",
            more_than_5_university: "Choose more than 5 universities",
            fast_payment: "Pay in less than 7 days",
            fast_payment_eom: "Fast payment by end of month",
            testimony: "Allow to share about your case",
            duo_booking: "Booking as a duo (with a friend)",

            // Payment Type Selector
            payment_type: "Payment Type",
            select_desired_payment: "Select your payment method",
            upfront_payment: "Upfront Payment",
            upfront_payment_description: "Pay the full amount at once",
            installment: "Installment",
            installment_description:
                "Pay in scheduled installments",


            // Installment Type Selector
            installment_type: "Installment Type",
            select_desired_installment: "Select your installment plan",
            company: "Company Installment",
            company_description: "Pay in two equal installments via your company",
            bank_12: "12-Month Bank Installment",
            bank_12_description: "Pay in 12 monthly bank installments",
            bank_24: "24-Month Bank Installment",
            bank_24_description: "Pay in 24 monthly bank installments",

            // Price Breakdown
            cost_breakdown: "Cost Breakdown",
            detailed_pricing_education_plan:
                "Detailed pricing for your education plan",
            program_type_label: "Program Type",
            countries_selected: "Countries Selected",
            universities_to_apply: "Universities to Apply",
            selected_countries: "Selected Countries",
            university_applications: "University Applications",
            per_application: "per application",
            subtotal: "Subtotal",
            discounts_applied: "Discounts Applied",
            service_fee_applied: "Service Fee Applied",
            payment_summary: "Payment Summary",
            pay_in_full: "Pay in Full",
            due_at_signing: "Due at Signing ({{percent}}%)",
            due_in_3_months: "Due in 3 Months ({{percent}}%)",
            total_amount: "Total Amount",
            monthly_payment: "Monthly payment ({{count}} months)",
            approx_in_kzt: "Approx. in KZT",

            total_savings: "Total Savings",
            total_cost: "Total Cost",
            in_currency: "in",
            select_countries_to_see_pricing:
                "Select countries to see detailed pricing",
            choose_study_destinations:
                "Choose your study destinations to calculate costs",

            // Tiers
            standard: "standard",
            premium: "premium",

            // General
            currency: "Currency",
            language: "Language",
            total: "Total",
            discount: "Discount",
        },
    },

    fr: {
        translation: {
            // Header & Navigation
            study_abroad: "Study Abroad",
            with_aray_azemkhan: "avec Aray Azemkhan",
            russian: "Russe",
            english: "Anglais",
            french: "Français",

            // Hero Section
            your_journey_to: "Votre voyage vers",
            world_class_education: "Une éducation de classe mondiale",
            hero_description:
                "Calculez les coûts personnalisés pour étudier à l'étranger et découvrez les opportunités dans les meilleures universités du monde. Commencez à planifier votre éducation internationale dès aujourd'hui.",
            universities_stat: "Universités",
            students_helped_stat: "Étudiants aidés",
            countries_stat: "Pays",
            success_rate_stat: "Taux de réussite",

            // Program Types
            program_type: "Type de programme",
            select_desired_degree:
                "Sélectionnez votre niveau de diplôme souhaité",
            foundation: "Programme préparatoire",
            foundation_description: "Programme préparatoire (1 an)",
            bachelor: "Licence",
            bachelor_description: "Diplôme de premier cycle (3-4 ans)",
            master: "Master",
            master_description: "Diplôme d'études supérieures (1-2 ans)",

            // Country Selection
            select_countries: "Sélectionner les pays",
            choose_up_to_6_destinations:
                "Choisissez jusqu'à 6 destinations pour vos études",
            continent: "Continent",
            quality: "Qualité",
            selected: "sélectionné(s)",
            maximum_reached: "Maximum atteint",

            // Continents
            Asia: "Asie",
            Europe: "Europe",
            "North America": "Amérique du Nord",
            "Middle East": "Moyen-Orient",

            // Countries
            china: "Chine",
            hong_kong: "Hong Kong",
            italy: "Italie",
            united_kingdom: "Royaume-Uni",
            united_states_of_america: "États-Unis d'Amérique",
            south_korea: "Corée du Sud",
            france: "France",
            hungary: "Hongrie",
            poland: "Pologne",
            germany: "Allemagne",
            austria: "Autriche",
            netherlands: "Pays-Bas",
            spain: "Espagne",
            belgium: "Belgique",
            canada: "Canada",
            uae: "Émirats arabes unis",
            qatar: "Qatar",
            malaysia: "Malaisie",

            // University Selection
            number_of_universities: "Nombre d'universités",
            how_many_universities_apply:
                "À combien d'universités voulez-vous postuler ?",
            universities: "Universités",
            recommended_text:
                "Recommandé : Postulez à 5-8 universités pour les meilleures chances d'acceptation",

            // Discounts
            special_offers: "Offres spéciales",
            save_money_exclusive_discounts:
                "Économisez de l'argent avec nos remises exclusives",
            more_than_5_university: "Choisir plus de 5 universités",
            fast_payment: "Payer en moins de 7 jours",
            fast_payment_eom: "Paiement rapide avant la fin du mois",
            testimony: "Autoriser à partager votre cas",
            duo_booking: "Réservation en duo (avec un ami)",

            // Payment Type Selector
            payment_type: "Type de paiement",
            select_desired_payment: "Sélectionnez votre mode de paiement",
            upfront_payment: "Paiement intégral",
            upfront_payment_description:
                "Payer la totalité en une seule fois",
            installment: "Paiement échelonné",
            installment_description:
                "Payer en plusieurs versements",

            // Installment Type Selector
            installment_type: "Type d’échelonnement",
            select_desired_installment:
                "Sélectionnez votre plan de paiement échelonné",
            company: "Paiement par l’entreprise",
            company_description:
                "Paiement en deux versements égaux via votre entreprise",
            bank_12: "Échelonnement bancaire 12 mois",
            bank_12_description: "Paiement en 12 mensualités bancaires",
            bank_24: "Échelonnement bancaire 24 mois",
            bank_24_description: "Paiement en 24 mensualités bancaires",

            // Price Breakdown
            cost_breakdown: "Répartition des coûts",
            detailed_pricing_education_plan:
                "Tarification détaillée pour votre plan d'éducation",
            program_type_label: "Type de programme",
            countries_selected: "Pays sélectionnés",
            universities_to_apply: "Universités à postuler",
            selected_countries: "Pays sélectionnés",
            university_applications: "Candidatures universitaires",
            per_application: "par candidature",
            subtotal: "Sous-total",
            discounts_applied: "Remises appliquées",
            service_fee_applied: "Frais de service appliqués",
            payment_summary: "Résumé du paiement",
            pay_in_full: "Payer en totalité",
            due_at_signing: "À payer à la signature ({{percent}}%)",
            due_in_3_months: "À payer dans 3 mois ({{percent}}%)",
            total_amount: "Montant total",
            monthly_payment: "Paiement mensuel ({{count}} mois)",
            approx_in_kzt: "Environ en KZT",

            total_savings: "Économies totales",
            total_cost: "Coût total",
            in_currency: "en",
            select_countries_to_see_pricing:
                "Sélectionnez les pays pour voir la tarification détaillée",
            choose_study_destinations:
                "Choisissez vos destinations d'études pour calculer les coûts",

            // Tiers
            standard: "standard",
            premium: "premium",

            // General
            currency: "Devise",
            language: "Langue",
            total: "Total",
            discount: "Remise",
        },
    },
};

const urlParams = new URLSearchParams(window.location.search)
const initialLng = urlParams.get('lang') || 'ru'

i18n.use(initReactI18next).init({
    resources,
    lng: initialLng,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
});

export default i18n;