import React from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

export const Hero: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        {t("your_journey_to")}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                            {t("world_class_education")}
                        </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        {t("hero_description")}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-gray-900">150+</div>
                                <div className="text-sm text-gray-600 font-medium">{t("universities_stat")}</div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <Users className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-gray-900">1K+</div>
                                <div className="text-sm text-gray-600 font-medium">{t("students_helped_stat")}</div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-gray-900">18</div>
                                <div className="text-sm text-gray-600 font-medium">{t("countries_stat")}</div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-gray-900">98%</div>
                                <div className="text-sm text-gray-600 font-medium">{t("success_rate_stat")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};