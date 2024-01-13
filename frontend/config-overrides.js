// module.exports = function override(config, env) {
//     config.resolve.fallback = {
//       ...config.resolve.fallback, // copy any existing fallbacks
//       "stream": require.resolve("stream-browserify"),
//       "assert": require.resolve("assert/"),
//       "http": require.resolve("stream-http"),
//       "https": require.resolve("https-browserify"),
//       "zlib": require.resolve("browserify-zlib"),
//       "url": require.resolve("url/"),
//     };
//     return config;
//   };
module.exports = function override(config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // copy any existing fallbacks
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
    };
    return config;
  };
  