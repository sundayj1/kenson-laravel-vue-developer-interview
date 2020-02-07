let actions = {
  // Submit form
  submit_form({commit}, user_details) {
    loaderToggle();
    return new Promise((resolve, reject) => {
      axios.post(route('contact'), user_details, { headers: { 'content-type': 'multipart/form-data' } } )
      .then(response => {
        resolve(response);
        loaderToggle();
      });
    });
  }
}

export default actions;
