import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">EduAbroad</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Your trusted partner in international education. 
                            We help students achieve their dreams of studying abroad.
                        </p>
                    </div>
                    
                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Services</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>University Applications</li>
                            <li>Visa Assistance</li>
                            <li>Scholarship Guidance</li>
                            <li>Pre-departure Support</li>
                        </ul>
                    </div>
                    
                    {/* Countries */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Study Destinations</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>🇺🇸 United States</li>
                            <li>🇬🇧 United Kingdom</li>
                            <li>🇨🇳 China</li>
                            <li>🇮🇹 Italy</li>
                            <li>🇰🇷 South Korea</li>
                            <li>🇭🇰 Hong Kong</li>
                        </ul>
                    </div>
                    
                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact</h4>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>info@eduabroad.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+7 (777) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Almaty, Kazakhstan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span>www.eduabroad.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr className="border-gray-800 my-8" />
                
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        © 2025 EduAbroad by Arailym Azemkhan. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};