const BASE_URL = 'https://midhunshankar.me';

/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
