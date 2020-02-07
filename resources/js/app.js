/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// iport bootstrap
import './bootstrap';
// import Vue
import Vue     from 'vue';
// Load Vuetify
import Vuetify from 'vuetify';
// import toasted
import Toasted            from 'vue-toasted';
// Import Vue Store
import Store   from '@/js/store/index';
// Route paths for Vue Router
import Routes  from '@/js/router.js';
// App template
import App     from '@/js/components/App';

Vue.use(Toasted, {
	theme: "toasted-primary",
	position: "bottom-center",
	duration : 5000,
    keepOnHover: true,
    iconPack : 'material-icons'
});
// Register plugins
Vue.use(Vuetify);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Pass vuex store to browser
window.$store = Store;

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
new Vue({
  router: Routes,
  render: h => h(App),
  Store
}).$mount('#app');
