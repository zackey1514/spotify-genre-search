<script>
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import '../app.pcss';
</script>

<div class="container mx-auto">
  <div class="content-center text-center">
    <div class=" mx-3 my-5">
      <Header />
    </div>
    <slot />
  </div>
  <Footer />
</div>
