// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/volume/2024-03-26', 
          permanent: false, 
          statusCode: 307
        }
      ];
    },
  };
  
  export default nextConfig;
  