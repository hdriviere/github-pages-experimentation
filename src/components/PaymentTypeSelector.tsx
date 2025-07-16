import {Discount, InstallmentType, PaymentType, Surcharge} from "../types";
import {Calendar, PiggyBank, Receipt} from "lucide-react";
import {InstallmentTypeSelector} from "./InstallmentTypeSelector.tsx";
import {useTranslation} from "react-i18next";
import {DISCOUNT_OPTIONS, SURCHARGE_OPTIONS} from "../pricing/pricingData.ts";

interface PaymentTypeSelectorProps {
    paymentType: PaymentType;
    setPaymentType: (t: PaymentType) => void;
    setSelectedDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>;
    setSelectedSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>;
}

export function PaymentTypeSelector({
    paymentType,
    setPaymentType,
    setSelectedDiscounts,
    setSelectedSurcharges
}: PaymentTypeSelectorProps) {
    const { t } = useTranslation();

    // are we in “installment” mode?
    const isInstallment = paymentType !== "upfront_payment";
    // pick a default installment if user just flipped to “installment”
    const defaultInstallment: InstallmentType = "company_installment";

    // function addDiscount(
    //     setSelectedDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>,
    //     discount: Discount
    // ) {
    //     setSelectedDiscounts(prev => {
    //         const isActive = prev.some(d => d.key === discount.key)
    //
    //         if (!isActive) {
    //             return [...prev, discount]
    //         } else {
    //             return prev
    //         }
    //     })
    // }

    function deleteDiscount(
        setSelectedDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>,
        discount: Discount
    ) {
        setSelectedDiscounts(prev => {
            const isActive = prev.some(d => d.key === discount.key)

            if (isActive) {
                return prev.filter(d => d.key !== discount.key)
            } else {
                return prev
            }
        })
    }

    function deleteSurcharge(
        setSelectedSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>,
        surcharge: Surcharge
    ) {
        setSelectedSurcharges(prev => {
            const isActive = prev.some(s => s.key === surcharge.key)

            if (isActive) {
                return prev.filter(s => s.key !== surcharge.key)
            } else {
                return prev
            }
        })
    }

    const handleUpfrontPaymentClick = () => {
        if (isInstallment) {
            setPaymentType("upfront_payment");
            deleteSurcharge(setSelectedSurcharges, SURCHARGE_OPTIONS["bank_installment"])
            //addDiscount(setSelectedDiscounts, DISCOUNT_OPTIONS["upfront_payment"])
        }
    }

    const handleInstallmentClick = () => {
        if (!isInstallment) {
            setPaymentType(defaultInstallment);
            deleteDiscount(setSelectedDiscounts, DISCOUNT_OPTIONS["upfront_payment"])
        }
    };

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                    <PiggyBank className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {t("payment_type")}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t("select_desired_payment")}
                    </p>
                </div>
            </div>

            {/* first‐level: Upfront vs Installment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upfront payment */}
                <div
                    onClick={handleUpfrontPaymentClick}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                        paymentType === "upfront_payment"
                            ? "border-amber-500 bg-amber-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-md"
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`p-3 rounded-lg ${
                                paymentType === "upfront_payment"
                                    ? "bg-amber-500"
                                    : "bg-gray-100 group-hover:bg-amber-100"
                            }`}
                        >
                            <Receipt
                                className={`w-6 h-6 ${
                                    paymentType === "upfront_payment"
                                        ? "text-white"
                                        : "text-gray-600 group-hover:text-amber-600"
                                }`}
                            />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">
                                {t("upfront_payment")}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t("upfront_payment_description")}
                            </div>
                        </div>
                    </div>
                </div>

                {/* “Installment” bucket */}
                <div
                    onClick={handleInstallmentClick}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                        isInstallment
                            ? "border-amber-500 bg-amber-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-md"
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`p-3 rounded-lg ${
                                isInstallment
                                    ? "bg-amber-500"
                                    : "bg-gray-100 group-hover:bg-amber-100"
                            }`}
                        >
                            <Calendar
                                className={`w-6 h-6 ${
                                    isInstallment
                                        ? "text-white"
                                        : "text-gray-600 group-hover:text-amber-600"
                                }`}
                            />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">
                                {t("installment")}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t("installment_description")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* second‐level: only when in installment mode */}
            {isInstallment && (
                <InstallmentTypeSelector
                    installmentType={paymentType as InstallmentType}
                    setInstallmentType={(inst) =>
                        setPaymentType(inst as PaymentType)
                    }
                    setSelectedSurcharges={setSelectedSurcharges}
                />
            )}
        </div>
    );
}