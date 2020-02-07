<template lang="pug">
  .d-flex.justify-content-center
    form.w-25.rounded.border.p-1(@submit.prevent="ContactUs" ref="contact_form" :action="route('contact')" method="post")
      .text-light.bg-success.mb-1.text-center {{ message }}
      input.form-control#name(type="text" name="name" v-model="name" placeholder="Enter Name" required)
      //- input(:value="app.csrf" type="hidden" name="_token")
      input.form-control#email.mt-1(type="email" name="email" v-model="email" placeholder="Enter Email Address" required)
      input.form-control#phone.mt-1(type="tel" name="phone" v-model="phone" pattern="[\(][0-9]{3}[\)] [0-9]{3}-[0-9]{4}" maxlength="14" placeholder="Phone Number: (123) 456-7899" required)
      input.form-control#address.mt-1(type="text" name="address" v-model="address" placeholder="Home Address" required)
      input.form-control#zip_code.mt-1(type="text" maxlength="5" pattern="[0-9]{5}" name="zip_code" v-model="zip_code" placeholder="Zip Code - 5 digits" title="Five digit zip code" required)
      uploader(accepts="image/*" :multiple="true" _key="contact_form" :callback="uploadCallback")
      .d-flex
        input.ml-auto.mt-1.bg-secondary.border-0.text-light(type="submit" value="Submit")
</template>
<script>
export default {
  data()
  {
    return {
      message   : null,
      name      : null,
      email     : null,
      phone     : null,
      address   : null,
      zip_code  : null,
      files     : []
    }
  },
  methods:
  {
    /**
     * Callback function after input file preview is generated
     *
     * @param {array} data
     * @return {string}
     */
    uploadCallback(data, uploadComponent)
    {
      this.uploadComponent = uploadComponent;
      // pass files
      return this.files.push(data);
    },

    /**
     * Submist user info backend
     */
    ContactUs()
    {
      var formData = new FormData();

      // fields to append
      [
        'name',
        'email',
        'phone',
        'address',
        'zip_code'
      ].forEach( (value, key) => {
        // append fields
        formData.append(value, this[value]);
      });

      // append attachment
      if( this.files.length )
      {
        this.files.forEach( file =>
        {
          formData.append('attachment[]', file)
        })
      }

      $store.dispatch('submit_form', formData)
      .then( r => {
        // Reset Form
        this.name = this.email = this.phone = this.address = this.zip_code = null;
        this.files = this.uploadComponent.previewData.data = [];

        // Display message
        this.message = "Request successful!";
      });
    }
  }
}
</script>
