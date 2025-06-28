import React from "react";
import { useTranslation } from "react-i18next";
import { DISCOUNT_OPTIONS } from "../pricing/pricingData";
import { Discount } from "../types";
import { Tag, Clock, Users } from "lucide-react";

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

    const getIcon = (key: string) => {
        switch (key) {
            case "fast_payment":
            case "fast_payment_eom":
                return <Clock className="w-5 h-5" />;
            case "duo_booking":
                return <Users className="w-5 h-5" />;
            default:
                return <Tag className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                    <Tag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Special Offers</h3>
                    <p className="text-sm text-gray-600">Save money with our exclusive discounts</p>
                </div>
            </div>
            
            <div className="space-y-3">
                {DISCOUNT_OPTIONS.map((discount) => {
                    const isSelected = selectedDiscounts.includes(discount);
                    
                    return (
                        <div
                            key={discount.key}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                                isSelected
                                    ? "border-green-500 bg-green-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
                            }`}
                            onClick={() => handleChange(discount)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${
                                    isSelected ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600"
                                }`}>
                                    {getIcon(discount.key)}
                                </div>
                                
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{t(discount.key)}</div>
                                </div>
                                
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    isSelected 
                                        ? "bg-green-500 text-white" 
                                        : "bg-green-100 text-green-700"
                                }`}>
                                    -{discount.value}%
                                </div>
                            </div>
                            
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleChange(discount)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    );
                })}
            </div>
            
            {selectedDiscounts.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm text-green-800">
                        <strong>Total savings:</strong> {selectedDiscounts.reduce((sum, d) => sum + d.value, 0)}% off your total cost
                    </div>
                </div>
            )}
        </div>
    );
};