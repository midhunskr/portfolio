/** @type {import('next').MetadataRoute.Manifest} */
export default function manifest() {
  return {
    name: 'Midhun Shankar — Design · Build · Automate',
    short_name: 'Midhun Shankar',
    description:
      'From the first idea to the launched product — one person across UX design, frontend development and AI-powered automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F0E8',
    theme_color: '#F4F0E8',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
