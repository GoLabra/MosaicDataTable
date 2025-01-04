/** @type {import('next').NextConfig} */
const nextConfig = {
    // For Github Pages
    ...((process.env.GITHUB_ACTIONS || process.env.DEPLOY_ENV === 'gh-pages') && {
        output: 'export',
        basePath: '/mosaic-data-table',
        assetPrefix: '/mosaic-data-table/',
        images: {
            unoptimized: true
        }
    })
};


export default nextConfig;
