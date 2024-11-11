import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AppwriteService from './src/appwrite/config.js'; // Adjust import based on your setup

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define static routes here
const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/post', changefreq: 'daily', priority: 0.8 }
];

// Fetch dynamic blog post routes from Appwrite
async function fetchBlogPostRoutes() {
  try {
    const postsData = await AppwriteService.getPosts();  
    const postRoutes = postsData?.documents.map(post => ({
      url: `/post/${post.$id}`,  
      changefreq: 'weekly',
      priority: 0.6
    }));
    return postRoutes;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Generate sitemap
async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: 'https://appwrite-blog-one-topaz.vercel.app' });

  // Write the sitemap to public/sitemap.xml
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap.xml'));
  sitemapStream.pipe(writeStream);

  // Add static routes
  staticRoutes.forEach(route => sitemapStream.write(route));

  // Fetch and add dynamic blog post routes
  const dynamicRoutes = await fetchBlogPostRoutes();
  dynamicRoutes.forEach(route => sitemapStream.write(route));

  // End the stream
  sitemapStream.end();

  // Wait until the stream is finished
  await streamToPromise(sitemapStream);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
});
