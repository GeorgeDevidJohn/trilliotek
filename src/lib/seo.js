import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
} from "./site";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: SITE_EMAIL,
    sameAs: [SOCIAL.instagram],
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    description: SITE_DESCRIPTION,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function getProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    email: SITE_EMAIL,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [
      "Website Development",
      "Web Development",
      "AI Integration",
      "Digital Marketing",
      "Scroll Animation & Interactive Design",
      "UI/UX Design",
      "Mobile App Development",
    ],
    description: SITE_DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function getHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(),
      getWebSiteJsonLd(),
      getProfessionalServiceJsonLd(),
    ],
  };
}
