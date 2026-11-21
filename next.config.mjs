/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Data Center Networking was retired and replaced by the server and
        // virtualization track. The old URL was live and indexed, so this is
        // permanent rather than a 404: existing links, bookmarks and search
        // results land on the track that succeeded it.
        source: '/internships/data-center-networking-internship',
        destination: '/internships/data-center-server-virtualization-internship',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
