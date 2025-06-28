import React from "react";
import { ProgramType } from "../types";
import { useTranslation } from "react-i18next";
import { GraduationCap, BookOpen } from "lucide-react";

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
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("program_type")}</h3>
                    <p className="text-sm text-gray-600">Select your desired degree level</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                        programType === "bachelor"
                            ? "border-indigo-500 bg-indigo-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
                    }`}
                    onClick={() => setProgramType("bachelor")}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                            programType === "bachelor" ? "bg-indigo-500" : "bg-gray-100 group-hover:bg-indigo-100"
                        }`}>
                            <BookOpen className={`w-6 h-6 ${
                                programType === "bachelor" ? "text-white" : "text-gray-600 group-hover:text-indigo-600"
                            }`} />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{t("bachelor")}</div>
                            <div className="text-sm text-gray-600">Undergraduate degree (3-4 years)</div>
                        </div>
                    </div>
                </div>
                
                <div
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                        programType === "master"
                            ? "border-indigo-500 bg-indigo-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
                    }`}
                    onClick={() => setProgramType("master")}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                            programType === "master" ? "bg-indigo-500" : "bg-gray-100 group-hover:bg-indigo-100"
                        }`}>
                            <GraduationCap className={`w-6 h-6 ${
                                programType === "master" ? "text-white" : "text-gray-600 group-hover:text-indigo-600"
                            }`} />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{t("master")}</div>
                            <div className="text-sm text-gray-600">Graduate degree (1-2 years)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};