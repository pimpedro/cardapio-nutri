// pages/api/opengraph.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    // Fetch HTML content of the URL
    const response = await axios.get(url);
    const htmlContent = response.data;

    // Parse HTML content to extract OpenGraph tags
    const $ = cheerio.load(htmlContent);
    const openGraphData = {};
    $('meta[property^="og:"]').each((_, element) => {
      const property = $(element).attr('property').replace('og:', '');
      const content = $(element).attr('content');
      openGraphData[property] = content;
    });

    res.status(200).json(openGraphData);
  } catch (error) {
    console.error('Error fetching or parsing OpenGraph data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}