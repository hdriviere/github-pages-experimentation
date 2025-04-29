export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        countries: params.get("countries")?.split("-").filter(Boolean) || [],
        universities: Number(params.get("universities")) || 1,
        program: params.get("program") === "master" ? "master" : "bachelor",
        currency: params.get("currency") || "KZT",
        discounts: params.get("discounts")?.split("-").filter(Boolean) || [],
        lang: params.get("lang") || "en",
    };
}

export function setQueryParams({
                                   countries,
                                   universities,
                                   program,
                                   currency,
                                   discounts,
                               }: {
    countries: string[];
    universities: number;
    program: string;
    currency: string;
    discounts: string[];
}) {
    const params = new URLSearchParams();
    if (countries.length) params.set("countries", countries.join("-"));
    params.set("universities", String(universities));
    params.set("program", program);
    params.set("currency", currency);
    if (discounts.length) params.set("discounts", discounts.join("-"));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
}