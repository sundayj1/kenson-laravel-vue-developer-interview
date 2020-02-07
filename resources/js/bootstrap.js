window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Import vue
window.Vue = require('vue');

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

window.axios.interceptors.response.use((response) => {
    return response;
}, (error) => {

  // Server returns 404 error code
  if( error.response.status === 404 )
  {
    window.location = `/404`;
  }

  // Server returns 422 or 403 or 401
  else if(error.response.status == 422 || error.response.status == 403 || error.response.status == 401 )
  {
    // Set error message to data
    var msg = error.response.data.message || error.response.data;

    // We are basically extracting errors from backend and having them displayed to user
    window._sharedData.app.rules.forEach( (value, keys) =>
    {
      // We're just checking if it's a specific type of error
      var err = error.response.data.errors;

      // Update message value
      if( err && err[value] )
      {
        msg = err[value][0];
      }
    });

    // Display toast
    window.Vue.toasted.error(msg, {
      icon: "error_outline",
      timeout: 0
    });

    // We only run this block if loader is open else we ignore
    if( !$('#loader').hasClass('d-none') )
    {
      loaderToggle();
    }
  }

  // trigger 'loading=false' event here
  return Promise.reject(error);
});

/**
 * Makes Laravel routes available at frontend scope
 *
 * @return string
 */
window.route = function()
{
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();

    if (window._sharedData.app.routes[name] === undefined) {
      console.error('Route not found ', name);
    } else {
      return window._sharedData.app.baseUrl + '/' + window._sharedData.app.routes[name]
        .split('/')
        .map(s => s[0] == '{' ? args.shift() : s)
        .join('/');
    }
};

// Loader
window.loaderToggle = function()
{
  document.querySelector('#loader').classList.toggle('d-none');
}

// Pass app to Vue
Vue.prototype.app = window._sharedData.app;

/*
* Makes route available to Vue components
*
* @paramm string route_path
* @return string
*/
Vue.prototype.route = window.route;
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
