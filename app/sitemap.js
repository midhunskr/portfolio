const BASE_URL = 'https://midhunshankar.me';

const ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
