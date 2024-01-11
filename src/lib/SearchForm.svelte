<script lang="ts">
  import { Button, Search } from 'flowbite-svelte';
  export let value: string;
  export let placeholder = '';
</script>

<Search bind:value {placeholder}>
  <Button on:click disabled={!value} on:click>Search</Button>
</Search>
