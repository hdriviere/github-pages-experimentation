import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    discountPercentage: number;
    setDiscountPercentage: (discount: number) => void;
};

export const DiscountSlider: React.FC<Props> = ({
                                                    discountPercentage,
                                                    setDiscountPercentage,
                                                }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-8">
            <label className="block font-semibold mb-1">
                {t("percentage_of_discount")}: {discountPercentage}
            </label>
            <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
};