/** @type {import('next').NextConfig} */

const nextConfig = {
    // For Github Pages
    ...((process.env.DEPLOY_ENV === 'gh-pages') && {
        output: 'export',
        basePath: '/MosaicDataTable',
        assetPrefix: '/MosaicDataTable/',
        images: {
            unoptimized: true
        }
    })
};

export default nextConfig;
