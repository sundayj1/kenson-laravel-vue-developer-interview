<template lang="pug">
  .m-0
    #loader.d-none.position-fixed.top-0.bottom-0.left-0.right-0
      .linePreloader.shadow
    .bg-secondary.p-2.menu
      router-link.m-1(:to="{name:'Home'}") Home Page
      router-link.m-1(:to="{name:'Contact'}") Contact Us
    .p-2
      router-view
</template>
<style scoped>
  .menu a
  {
    color: var(--light);
  }
  .menu a.router-link-exact-active
  {
    color: var(--primary);
  }
</style>
