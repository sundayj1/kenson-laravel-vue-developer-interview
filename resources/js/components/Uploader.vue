<template lang="pug">
  .text-center.w-100
    .upload_box.mt-1(style="border: 3px dotted #dee2e6" v-if='!previewData.data.length')
      label.w-100.pt-2(:for="'uploadBtn_' + _key")
        span Click to Upload
    .preview(v-bind:class='{ masonry_preview : multiple }' v-else='')
      .masonry-item.m-0(v-for='(item, index) in previewData.data' v-bind:key='index')
        video.w-100.masonry-content.rounded-0.mt-2(:src='item' v-if="accepts.split('/')[0] === 'video'" controls='')
        img.rounded.mt-1.w-100(:src='item' v-else='')
    input.d-none(type='file' :id="'uploadBtn_' + _key" ref='file' :accept='accepts' @change='handleFileUpload()' :multiple='multiple' :name='name')
</template>
<script>
export default {
  data()
  {
    return {
      previewData: {
        data: []
      }
    }
  },
  props: {
    /**
     * File types to accept
     */
    accepts: {
      type    : String,
      default : "video/*"
    },

    /**
     * File name
     */
    name: {
      type    : String,
      default : 'attachments[]'
    },

    /**
     * Callback to fire after preview has been generated
     */
    callback: {
      type    : Function,
      default : () => {}
    },

    /**
     * If more than one file can be uploaded
     */
    multiple: {
      type    : Boolean,
      default : false
    },

    /**
     * Unique identifier for parents
     */
    _key: {
      type      : String,
      required  : true
    }
  },
  methods: {

    /**
     * Fires when a file is selected
     *
     * @return {resource} FIleReader
     */
    handleFileUpload()
    {
      var files = this.$refs.file.files;
      for( var i = 0; i < files.length; i++)
      {
        /*
        Initialize a File Reader object
        */
        let reader  = new FileReader();

        /*
        Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
          // Add item to preview
          this.previewData.data.push(reader.result);
        }.bind(this), false);

        /*
          Fire the readAsDataURL method which will read the file in and
          upon completion fire a 'load' event which we will listen to and
          display the preview.
        */
        reader.readAsDataURL( files[i] );

        // Send data
        this.callback(files[i], this);

      }
    }
  }
}
</script>
