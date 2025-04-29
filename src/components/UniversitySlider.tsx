import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    universityCount: number;
    setUniversityCount: (count: number) => void;
};

export const UniversitySlider: React.FC<Props> = ({
                                                      universityCount,
                                                      setUniversityCount,
                                                  }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-8">
            <label className="block font-semibold mb-1">
                {t("number_of_universities")}: {universityCount}
            </label>
            <input
                type="range"
                min={1}
                max={20}
                value={universityCount}
                onChange={(e) => setUniversityCount(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
};