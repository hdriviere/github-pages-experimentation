import React from "react";
import { ProgramType } from "../types";
import { useTranslation } from "react-i18next";

type Props = {
    programType: ProgramType;
    setProgramType: (type: ProgramType) => void;
};

export const ProgramTypeSelector: React.FC<Props> = ({
                                                         programType,
                                                         setProgramType,
                                                     }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-6">
            <div className="font-semibold mb-2">{t("program_type")}:</div>
            <div className="flex gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="programType"
                        value="bachelor"
                        checked={programType === "bachelor"}
                        onChange={() => setProgramType("bachelor")}
                    />
                    {t("bachelor")}
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="programType"
                        value="master"
                        checked={programType === "master"}
                        onChange={() => setProgramType("master")}
                    />
                    {t("master")}
                </label>
            </div>
        </div>
    );
};
