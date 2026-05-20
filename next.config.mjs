/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pin the workspace root so Next.js doesn't pick up the stray
    // C:\projects\package-lock.json as the inferred root.
    outputFileTracingRoot: import.meta.dirname,
    turbopack: {
        root: import.meta.dirname,
    },
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