<script context="module">
  import { setContext, afterUpdate } from "svelte";
  import { writable } from "svelte/store";

  import popper from "./popper";

  import { EMPTY, POPUP, INPUT, STATE } from "./context";
  import focusEnterLeave from "./focusEnterLeave";

  import ComboboxList from "./ComboboxList.svelte";
  import ComboboxInput from "./ComboboxInput.svelte";
  import ComboboxListOption from "./ComboboxListOption.svelte";

  export { ComboboxList, ComboboxInput, ComboboxListOption };
</script>

<script>
  import { createEventDispatcher } from 'svelte'
  import cn from "clsx";
  let className

  export let id;
  export let open = false;

  export { className as class }

  let popup = writable(null);
  let input = writable(null);
  let dispatch = createEventDispatcher()
  let element, raf;

  $: if (!open) $ctx.focusedOption = EMPTY;

  setContext(POPUP, popup);
  setContext(INPUT, input);

  const ctx = writable({
    id,
    isOpen: open,
    close,
    open: () => {
      dispatch('toggle', { open: true })
    },
    focusedOption: EMPTY,
    listId: `${id}__list`,
    activeId: `${id}__active_option`,
    onSelect: () => {},
  });

  setContext(STATE, ctx);

  $: $ctx.isOpen = open;

  function close() {
    dispatch('toggle', { open: false })
  }

  function handleFocusLeave(e) {
    close()
  }

  afterUpdate(() => {
    if (
      $ctx.focusedOption !== EMPTY && 
      !$popup?.querySelector('[role="option"][data-focused]')
    ) {
      $ctx.focusedOption = EMPTY
    }
  })
</script>

<div 
  tabindex="-1"
  bind:this={element}
  use:focusEnterLeave
  on:focusleave={handleFocusLeave}
  aria-expanded={open}
  aria-haspopup={$ctx.listId}
  class={cn('combobox', className)}
>
  <slot />
</div>