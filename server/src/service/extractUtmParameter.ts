export const extractUtmParameters = (urlStr: string) => {
  try {
    const parsedUrl = new URL(urlStr);
    return {
      utm_source: parsedUrl.searchParams.get("utm_source") || "organic",
      utm_medium: parsedUrl.searchParams.get("utm_medium") || "none",
      utm_campaign: parsedUrl.searchParams.get("utm_campaign") || "none",
      utm_term: parsedUrl.searchParams.get("utm_term") || "none",
      utm_content: parsedUrl.searchParams.get("utm_content") || "none",
    };
  } catch (error) {
    return {
      utm_source: "organic",
      utm_medium: "none",
      utm_campaign: "none",
      utm_term: "none",
      utm_content: "none",
    };
  }
};