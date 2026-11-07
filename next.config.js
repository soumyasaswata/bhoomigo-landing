/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      // Short links printed as QR codes on visiting cards / leaflets, e.g. bhoomigo.co/c/jjp1.
      // Tags the visit so GA shows scans (and the WhatsApp/call taps that follow) per card code.
      {
        source: '/c/:code',
        destination: '/?utm_source=card&utm_medium=print&utm_campaign=:code',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
