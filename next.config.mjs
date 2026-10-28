/** @type {import('next').NextConfig} */

// Content Security Policy (finding S7). Report-Only for now: AG Grid / AG Charts
// inject inline styles and Google sign-in needs its own origins, so violations
// are logged in the browser console instead of blocked. Promote to
// `Content-Security-Policy` after a week of clean reports.
const contentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com",
    "img-src 'self' data: blob: https://*.googleusercontent.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://accounts.google.com",
    "frame-src https://accounts.google.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://accounts.google.com",
].join('; ');

const securityHeaders = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
];

const nextConfig = {
    // Pin the workspace root so Next.js doesn't pick up the stray
    // C:\projects\package-lock.json as the inferred root.
    outputFileTracingRoot: import.meta.dirname,
    turbopack: {
        root: import.meta.dirname,
    },
    // The SQL Server driver is a plain Node dependency; load it at runtime
    // instead of bundling it. Bundling drags in tedious -> @azure/identity ->
    // open -> powershell-utils, whose hard-coded powershell.exe path makes
    // Turbopack's build panic (seen 2026-10-28 after the October dependency
    // patch; it never needed to be in the bundle).
    serverExternalPackages: ['mssql', 'tedious'],
    compiler: {
        styledComponents: true,
    },
    devIndicators: false,
    allowedDevOrigins: ['localhost:3000', 'data.slusd.us'],
    experimental: {
        // Tree-shake the icon barrels (finding P11)
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },
    async headers() {
        return [{ source: '/(.*)', headers: securityHeaders }];
    },
}

export default nextConfig;
