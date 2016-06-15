const path = require('path');
module.exports = {
  entry: {
    app: ["./js/main.js"]
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
};

// NOTE: `context` and `path` are relative to this config file.
