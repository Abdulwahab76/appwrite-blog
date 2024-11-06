import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your routes manually here
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/blog/post-1', changefreq: 'weekly', priority: 0.6 },
  { url: '/blog/post-2', changefreq: 'weekly', priority: 0.6 },
  // Add more static routes or dynamically generated routes here
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: 'https://yourwebsite.com' });

  // Write the sitemap to public/sitemap.xml
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));
  sitemapStream.pipe(writeStream);

  // Add each route to the sitemap
  routes.forEach(route => sitemapStream.write(route));
  sitemapStream.end();

  // Wait until the stream is finished
  await streamToPromise(sitemapStream);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
});
