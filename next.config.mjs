/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    assetPrefix: '',
    basePath: '',
    experimental: {
        esmExternals: false,
    },
}

export default nextConfig
