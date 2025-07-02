export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        lang: params.get("lang") || "ru",
        countries: params.get("countries")?.split("-").filter(Boolean) || [],
        universities: Number(params.get("universities")) || 1,
        program: params.get("program") === "master" ? "master" : params.get("program") === "bachelor" ? "bachelor" : "foundation",
        currency: params.get("currency") || "KZT",
        discounts: params.get("discounts")?.split("-").filter(Boolean) || [],
        surcharges: params.get("surcharges")?.split("-").filter(Boolean) || [],
        payment: params.get("payment") === 'upfront_payment' ? 'upfront_payment' : params.get("payment") === 'company_installment' ? 'company_installment' : params.get("payment") === '12_months_bank_installment' ? '12_months_bank_installment' : '24_months_bank_installment',
    };
}

export function setQueryParams({
                                   lang,
                                   countries,
                                   universities,
                                   program,
                                   currency,
                                   discounts,
                                   surcharges,
                                   payment,
                               }: {
    lang: string
    countries: string[];
    universities: number;
    program: string;
    currency: string;
    discounts: string[];
    surcharges: string[];
    payment: string;
}) {
    const params = new URLSearchParams();
    params.set('lang', lang);
    if (countries.length) params.set("countries", countries.join("-"));
    params.set("universities", String(universities));
    params.set("program", program);
    params.set("currency", currency);
    if (discounts.length) params.set("discounts", discounts.join("-"));
    if (surcharges.length) params.set("surcharges", surcharges.join("-"));
    params.set("payment", payment)
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
}