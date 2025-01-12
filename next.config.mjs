/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'en.wikipedia.org'], // image domains
  },
  webpack(config ) {
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
      
    });

        // Rule for WebAssembly files
        config.module.rules.push({
          test: /\.wasm$/,
          type: 'webassembly/async', // Use 'async' for WebAssembly with Webpack 5
        });
    

    config.experiments = {
      asyncWebAssembly: true, // or syncWebAssembly: true
      layers: true
    };
    return config;
  },

};




export default nextConfig;
