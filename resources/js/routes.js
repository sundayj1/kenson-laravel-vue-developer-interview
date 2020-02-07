// Pages views
// Homepage
import Home           from '@/js/views/Home';
// Contact Page
import Contact        from '@/js/views/Contact';
// NotFound
import NotFound       from '@/js/views/NotFound';

// Pages SEO
import SEO              from '@/js/seo.js';

const routes = [
  // Home page
  {
    meta      : {
      title   : SEO.Home.title,
    },
    path      : '/',
    name      : 'Home',
    component : Home
  },

  // Contact us
  {
    meta      :
    {
      title   : SEO.Contact.title
    },
    path      : '/contact-us',
    name      : 'Contact',
    component : Contact
  },

  // 404 Page
  {
    meta      : {
      title   : SEO.NotFound.title,
    },
    path      : '/404',
    name      : 'NotFound',
    component : NotFound
  },

  // Default
  {
    meta      :
    {
      title   : SEO.Default.title
    },
    path      : '*',
    name      : 'Default',
    redirect  : '/404'
  }
]

routes.forEach( (route ) =>
{
  // Add page Title
  route.meta.title    = SEO[route.name].title;

  // Include Page Meta Tags
  route.meta.metaTags = [
    {
      name: 'description',
      content: SEO[route.name].description
    },
    {
      property: 'og:description',
      content: SEO[route.name].description
    },
    {
      name: 'twitter:description',
      content: SEO[route.name].description
    },
    {
      property: 'og:title',
      content: SEO[route.name].title
    },
    {
      name: 'twitter:title',
      content: SEO[route.name].title
    }
  ]
});

export default routes;
