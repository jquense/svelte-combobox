<script context="module">
  export const options = new WeakMap();
</script>

<script>
  import cn from "clsx";
  import { findAll } from 'highlight-words-core'
  import { getContext, afterUpdate } from "svelte";
  import { POPUP, STATE } from "./context";

  export let option = null;
  export let value;
  export let data

  let state = getContext(STATE);

  $: focused = $state.focusedOption?.value === value;
  $: selected = $state.value == value;

  $: strValue = String(value);
  $: substrings = findAll({ 
    searchWords: ($state.value || '').split(/\s+/), 
    textToHighlight: strValue
  })
  
  afterUpdate(() => {
    if (option) {
      options.set(option, { value, data })
    }
  })
</script>

<div 
  tabindex="-1" 
  role="option" 
  class={cn(
    'autocomplete-option', 
    focused && 'autocomplete-option-focused',
    selected && 'autocomplete-option-selected'
  )} 
  bind:this={option}
  aria-selected={selected}
  data-focused={focused || undefined}
  id={focused ? $state.activeId : undefined}
  on:click={(e) => $state.onSelect({ value, data }, e)}
>
  <slot {data} {value} {substrings} {focused} {selected}>
    {#if substrings.length}
      {#each substrings as { start, end, highlight }}
        {#if highlight}
          <strong>{strValue.slice(start, end)}</strong>
        {:else}
          {strValue.slice(start, end)}
        {/if}
      {/each}
    {:else} {value}
    {/if}
  </slot>
</div>