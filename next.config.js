module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', "yaml"],
    images: {
      remotePatterns: [
        {protocol: 'https', hostname: 'img.icons8.com', port: '', pathname: '**/*'},
        {protocol: 'https', hostname: 's.gravatar.com', port: '', pathname: '**/*'},
      ]
    },
  };

  return nextConfig;
};