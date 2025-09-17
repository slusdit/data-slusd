/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    devIndicators: false,
    allowedDevOrigins: ['localhost:3000', 'data.slusd.us'],
}

export default nextConfig;