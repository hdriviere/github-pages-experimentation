import React, {ChangeEvent} from "react";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";

type Props = {
    universityCount: number;
    setUniversityCount: (count: number) => void;
};

export const UniversitySlider: React.FC<Props> = ({
    universityCount,
    setUniversityCount,
}) => {
    const { t } = useTranslation();

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCount = Number(e.target.value)
        setUniversityCount(newCount)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("number_of_universities")}</h3>
                    <p className="text-sm text-gray-600">{t("how_many_universities_apply")}</p>
                </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">{t("universities")}</span>
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
                        <strong>{t("recommended_text")}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};