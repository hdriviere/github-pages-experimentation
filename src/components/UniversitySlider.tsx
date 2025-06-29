import React, {ChangeEvent} from "react";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";
import {Discount} from "../types.ts";
import {DISCOUNT_OPTIONS} from "../pricing/pricingData.ts";

type Props = {
    universityCount: number;
    setUniversityCount: (count: number) => void;
    setSelectedDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>;
};

export const UniversitySlider: React.FC<Props> = ({
    universityCount,
    setUniversityCount,
    setSelectedDiscounts,
}) => {
    const { t } = useTranslation();

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 1) parse the new slider value once
        const newCount = Number(e.target.value)
        // 2) update the count
        setUniversityCount(newCount)

        // 3) toggle the “more_than_5_university” discount
        const TOGGLE_KEY = "more_than_5_university" as const
        const discountOption = DISCOUNT_OPTIONS.find(d => d.key === TOGGLE_KEY)
        if (!discountOption) return  // safety

        setSelectedDiscounts(prev => {
            const isActive = prev.some(d => d.key === TOGGLE_KEY)

            // a) if we now have >5 unis, ensure it’s in the array
            if (newCount > 5 && !isActive) {
                return [...prev, discountOption]
            }
            // b) if we now have ≤5 unis, ensure it’s out of the array
            if (newCount <= 5 && isActive) {
                return prev.filter(d => d.key !== TOGGLE_KEY)
            }
            // c) otherwise, no change
            return prev
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("number_of_universities")}</h3>
                    <p className="text-sm text-gray-600">How many universities do you want to apply to?</p>
                </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Universities</span>
                    <div className="bg-purple-100 px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold text-purple-700">{universityCount}</span>
                    </div>
                </div>
                
                <div className="relative">
                    <input
                        type="range"
                        min={1}
                        max={20}
                        value={universityCount}
                        onChange={(e) => handleSliderChange(e)}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((universityCount - 1) / 19) * 100}%, #e5e7eb ${((universityCount - 1) / 19) * 100}%, #e5e7eb 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                    </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                    <p>
                        <strong>Recommended:</strong> Apply to 5-8 universities for the best chances of acceptance
                    </p>
                </div>
            </div>
        </div>
    );
};