const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '@': __dirname + '/resources'
      }
    },
    module:
    {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        }
      ]
    }
  })
  // Proxy server
  .browserSync('kenson.dev')
  // Compile Js
  .js('resources/js/app.js', 'public/js')
  // Compile CSS
  .sass('resources/sass/app.scss', 'public/css')
  // Assets versioning
  .version()
  // Disable mix notifications
  .disableNotifications();

