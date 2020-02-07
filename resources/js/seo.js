// app name
const app_name = Vue.prototype.app.name;

const seo = {
  // Home Page
  Home          :
  {
    title       : 'Home',
    description : 'Welcome to ' + app_name + '\'s homepage.'
  },

  // Contact Us Page
  Contact       :
  {
    title       : 'Contact Us',
    description : 'Reaching out to ' + app_name + ' has never been easier!'
  },

  // 404 Page
  NotFound      :
  {
    title       : '404 Not found',
    description : 'The Page you requested could not be found!'
  },

  // Default
  Default       :
  {
    title       : ''
  }
};

// Append to property
for( var i in seo )
{
  seo[i].title = seo[i].title + ' | ' + app_name;
}

module.exports = seo;
