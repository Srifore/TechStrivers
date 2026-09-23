import React, { useEffect } from 'react';

/**
 * Reusable SEO component for dynamic head metadata & Schema.org JSON-LD injection
 */
export default function SEO({
  title = "TechStrivers - Learn | Build | Innovate | Connect Towards Future",
  description = "TechStrivers is a technology-focused learning platform in Bengaluru offering hands-on engineering projects, IoT training, robotics, AI, PCB design, internships, and workshops.",
  keywords = "TechStrivers, engineering projects, IoT training, robotics workshops, AI learning, PCB design, engineering internships, Bengaluru, embedded systems",
  canonical = "https://techstrivers.com",
  ogTitle,
  ogDescription,
  ogImage = "https://techstrivers.com/images/hero_lab.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  schema,
  noindex = false
}) {
  useEffect(() => {
    // 1. Dynamic Document Title
    // Only append the brand suffix when it still fits Google's ~60-char
    // display limit - otherwise the suffix just guarantees truncation.
    const BRAND_SUFFIX = ' | TechStrivers Bengaluru';
    const formattedTitle = title.includes('TechStrivers') || (title.length + BRAND_SUFFIX.length) > 60
      ? title
      : `${title}${BRAND_SUFFIX}`;
    document.title = formattedTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function to update or create link tags (e.g. canonical)
    const updateLinkTag = (relValue, hrefValue) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relValue);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // 2b. Robots Tag - explicitly reset on every render so a noindex page
    // (e.g. a 404) can't leak into the next client-side navigation.
    updateMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 3. Canonical Tag
    updateLinkTag('canonical', canonical);

    // 4. Open Graph Tags
    const finalOgTitle = ogTitle || formattedTitle;
    const finalOgDesc = ogDescription || description;
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', finalOgTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', finalOgDesc);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'TechStrivers');

    // 5. Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCard);
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalOgTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalOgDesc);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Schema.org JSON-LD Script Injection
    let scriptElement = document.getElementById('ts-schema-jsonld');
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'ts-schema-jsonld';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanup if necessary when component unmounts
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, schema, noindex]);

  return null;
}
