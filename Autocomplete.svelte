<script context="module">
  import Combobox, { ComboboxListOption } from "./Combobox.svelte";
  import ComboboxList from "./ComboboxList.svelte";
  import ComboboxInput from "./ComboboxInput.svelte";

  export { ComboboxListOption as ListOption };
</script>

<script>
  import cn from "clsx";
  import { createEventDispatcher } from 'svelte'
  
  let className = ''
  export { className as class }
  export let id
  export let value = '';
  export let open = false;
  export let showCaret = false;
  export let disabled = false;
  export let readonly = false

  let input;
  const toggle = () => {
    if (readonly) return

    open = !open
    input.focus()
  }
</script>

<style>
  button {
    vertical-align: middle;
    outline: none;
  }
</style>
<Combobox 
  {id}
  {open}
  on:toggle={e => open = e.detail.open } 
  class={cn('autocomplete', className)}
>
  <ComboboxInput 
    {...$$restProps}
    {disabled}
    {readonly}
    on:input
    on:selectitem
    on:valuechange
    bind:value
    bind:input
  />
  {#if showCaret} 
    <button 
      {disabled}
      type="button" 
      tabindex="-1"
      class="autocomplete-caret"
      on:click|preventDefault={toggle} 
    >
      <svg fill="currentColor" viewBox="0 0 32 16" style="width: 16px; height 16px;" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
        <path d="M18.12 14.88a2.999 2.999 0 01-4.24 0L5.121 6.121A3 3 0 017.242 1h17.515a3 3 0 012.12 5.122l-8.756 8.757z"/>
      </svg>
    </button>
  {/if}
  <ComboboxList>
    <slot />
  </ComboboxList>
</Combobox>