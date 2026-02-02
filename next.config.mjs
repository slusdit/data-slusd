/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    devIndicators: false,
    allowedDevOrigins: ['localhost:3000', 'data.slusd.us'],
    typescript: {
        // Ignore TypeScript errors during build
        // TODO: Fix type errors and remove this
        ignoreBuildErrors: true,
    },
}

export default nextConfig;