<script>
  import Autocomplete, { ListOption } from "./Autocomplete.svelte";

  let open = false;

  const items = ["red", "blue", "purple", "orange", "green"];

  $: value = "";
  $: color = "";

  $: colors = items.filter(c => c.includes(color));

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
</script>

<style>
  main {
    height: 3000px;
    font-family: sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 300px;
    gap: 20px;
  }
</style>

<main>
	<h1>Hello CodeSandbox</h1>
	<h2>VALUE {value}</h2>
  <button on:click={() => { open = true }}>toggle</button>
  <input value={value} />

	<!-- <Autocomplete id="cbo" bind:value showCaret>
    {#each items as color}
      <ListOption value={color} />
    {/each}
  </Autocomplete> -->

  <br /><br />

  <Autocomplete 
    id="cbo-0" 
    name='example-1'
    bind:value={color}
  >
    {#each colors as color (color)}
      <ListOption value={color} />
    {/each}
  </Autocomplete>

  <Autocomplete 
    {value}
    disabled
    id="cbo-2" 
    showCaret
    on:valuechange={({ detail }) => {
      value = detail.value;
    }}
  >
    {#each numbers as num}
      <ListOption value={items} data={num} />
    {/each}
  </Autocomplete>
  <input  />
</main>