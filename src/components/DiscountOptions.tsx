import React from "react";
import { useTranslation } from "react-i18next";
import { DISCOUNT_OPTIONS } from "../pricing/pricingData.ts";
import {Discount} from "../types.ts";

type Props = {
    selectedDiscounts: Discount[];
    setSelectedDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>;
};

export const DiscountOptions: React.FC<Props> = ({
                                                     selectedDiscounts,
                                                     setSelectedDiscounts,
                                                 }) => {
    const { t } = useTranslation();

    const handleChange = (discount: Discount) => {
        setSelectedDiscounts((prev) =>
            prev.includes(discount)
                ? prev.filter((k) => k !== discount)
                : [...prev, discount]
        );
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col gap-2">
                {DISCOUNT_OPTIONS.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedDiscounts.includes(opt)}
                            onChange={() => handleChange(opt)}
                        />
                        {t(opt.key) /* Use t(opt.label) if you want to translate the label */}
                        <span className="text-xs text-gray-500">({opt.value}%)</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
