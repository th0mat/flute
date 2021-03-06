/**
 * Build config for electron 'Main Process' file
 */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base';

export default validate(merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './main.development'],

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: './main.js'
  },

  plugins: [
    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin({
      // Disable deadcode until https://github.com/babel/babili/issues/385 fixed
      deadcode: false,
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env': {  // MF_ENV='test' => change userDir to mocks/userdir
        NODE_ENV: JSON.stringify('production'),
        MF_USERDIR: JSON.stringify(process.env.MF_USERDIR)
      }
    })
  ],

  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-main',

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
}));
