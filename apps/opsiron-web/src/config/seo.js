import { SITE_META, CONTACT_INFO, PRICING_PLANS } from '../constants/content';

/**
 * Opsiron SEO Configuration & Structured Data Generators
 * * Bu dosya, content.js'deki ham verileri alır ve arama motorları için
 * * zengin veri (Rich Snippets) formatına dönüştürür.
 */

// ============================================
// DEFAULT META CONFIGURATION
// ============================================
export const defaultMeta = {
  title: SITE_META.defaultTitle,
  titleTemplate: `%s | ${SITE_META.siteName}`,
  description: SITE_META.defaultDescription,
  canonical: SITE_META.siteUrl,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_META.siteUrl,
    site_name: SITE_META.siteName,
    images: [
      {
        url: `${SITE_META.siteUrl}${SITE_META.ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE_META.siteName,
      },
    ],
  },
  twitter: {
    handle: SITE_META.social.twitter,
    site: SITE_META.social.twitter,
    cardType: 'summary_large_image',
  },
};

// ============================================
// JSON-LD STRUCTURED DATA GENERATORS
// ============================================

export const structuredData = {
  /**
   * Organizasyon Şeması (Tüm sayfalarda olmalı)
   * Logo, iletişim bilgileri ve sosyal medya profillerini tanımlar.
   */
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_META.siteName,
    url: SITE_META.siteUrl,
    logo: `${SITE_META.siteUrl}/logo.png`, // Logo path'ini güncelleyeceğiz
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish',
    },
    sameAs: [
      `https://twitter.com/${SITE_META.social.twitter.replace('@', '')}`,
      `https://linkedin.com/company/${SITE_META.social.linkedin}`,
      `https://facebook.com/${SITE_META.social.facebook}`,
    ],
  }),

  /**
   * Yazılım Uygulaması Şeması (CraftOps & ServeOps için)
   * Ürünün fiyatı, işletim sistemi ve kategorisini tanımlar.
   */
  softwareApplication: (productName, path, description, priceRange = "Contact for pricing") => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: productName,
    operatingSystem: 'Cloud, Web Browser',
    applicationCategory: 'BusinessApplication',
    description: description,
    offers: {
      '@type': 'Offer',
      price: '0', // Fiyat değişken olduğu için 0 veya sembolik
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock', 
      priceValidUntil: '2025-12-31',
      description: 'İşletmeye özel fiyatlandırma',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '24',
    },
    url: `${SITE_META.siteUrl}${path}`,
  }),

  /**
   * Breadcrumb Şeması
   * Sayfanın hiyerarşisini gösterir.
   */
  breadcrumb: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_META.siteUrl}${item.path}`,
    })),
  }),
};