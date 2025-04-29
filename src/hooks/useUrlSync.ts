export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        countries: params.get("countries")?.split("-").filter(Boolean) || [],
        universities: Number(params.get("universities")) || 1,
        program: params.get("program") === "master" ? "master" : "bachelor",
        currency: params.get("currency") || "KZT",
        discount: Number(params.get("discount")) || 0,
        lang: params.get("lang") || "en",
    };
}

export function setQueryParams({
                                   countries,
                                   universities,
                                   program,
                                   currency,
                                   discount,
                               }: {
    countries: string[];
    universities: number;
    program: string;
    currency: string;
    discount: number;
}) {
    const params = new URLSearchParams();
    if (countries.length) params.set("countries", countries.join("-"));
    params.set("universities", String(universities));
    params.set("program", program);
    params.set("currency", currency);
    params.set("discount", String(discount));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
}