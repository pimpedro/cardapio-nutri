/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trela.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd29vvterh1pj9i.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'renowned-sunrise-2d8e4a6fb3.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.essentialnutrition.com.br', // Novo domínio
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;