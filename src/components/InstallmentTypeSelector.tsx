import {Calendar, Handshake, Landmark} from "lucide-react";
import { useTranslation } from "react-i18next";
import {InstallmentType, Surcharge} from "../types.ts";
import {SURCHARGE_OPTIONS} from "../pricing/pricingData.ts";

export interface InstallmentTypeSelectorProps {
    installmentType: InstallmentType;
    setInstallmentType: (t: InstallmentType) => void;
    setSelectedSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>;
}

export function InstallmentTypeSelector({
    installmentType,
    setInstallmentType,
    setSelectedSurcharges,
}: InstallmentTypeSelectorProps) {
    const { t } = useTranslation();

    function addSurcharge(
        setSelectedSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>,
        surcharge: Surcharge
    ) {
        setSelectedSurcharges(prev => {
            const isActive = prev.some(s => s.key === surcharge.key)

            if (!isActive) {
                return [...prev, surcharge]
            } else {
                return prev
            }
        })
    }

    function deleteSurcharge(
        setSelectedSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>,
        surcharge: Surcharge
    ) {
        setSelectedSurcharges(prev => {
            const isActive = prev.some(s => s.key === surcharge.key)

            if (isActive) {
                return prev.filter(s => s.key !== surcharge.key)
            } else {
                return prev
            }
        })
    }

    const BANK_KEYS: InstallmentType[] = [
        "12_months_bank_installment",
        "24_months_bank_installment",
    ] as const

    function handleClick(key: InstallmentType) {
        setInstallmentType(key)

        const isBank = BANK_KEYS.includes(key)

        if (isBank) {
            addSurcharge(setSelectedSurcharges, SURCHARGE_OPTIONS["bank_installment"])
        } else {
            deleteSurcharge(setSelectedSurcharges, SURCHARGE_OPTIONS["bank_installment"])
        }
    }

    const options: {
        key: InstallmentType;
        Icon: React.ComponentType<{ className?: string }>;
        title: string;
        description: string;
    }[] = [
        {
            key: "company_installment",
            Icon: Handshake,
            title: t("company"),
            description: t("company_description"),
        },
        {
            key: "12_months_bank_installment",
            Icon: Landmark,
            title: t("bank_12"),
            description: t("bank_12_description"),
        },
        {
            key: "24_months_bank_installment",
            Icon: Landmark,
            title: t("bank_24"),
            description: t("bank_24_description"),
        },
    ];

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {t("installment_type")}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t("select_desired_installment")}
                    </p>
                </div>
            </div>

            {/* installment cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {options.map(({ key, Icon, title, description }) => {
                    const isActive = installmentType === key;
                    return (
                        <div
                            key={key}
                            onClick={() => handleClick(key)}
                            className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                                isActive
                                    ? "border-amber-500 bg-amber-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-md"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`p-3 rounded-lg ${
                                        isActive
                                            ? "bg-amber-500"
                                            : "bg-gray-100 group-hover:bg-amber-100"
                                    }`}
                                >
                                    <Icon
                                        className={`w-6 h-6 ${
                                            isActive
                                                ? "text-white"
                                                : "text-gray-600 group-hover:text-amber-600"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{title}</div>
                                    <div className="text-sm text-gray-600">{description}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}