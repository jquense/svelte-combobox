<script>
  import cn from "clsx";
  import { getContext } from "svelte";
  import { POPUP, STATE } from "./context";
  import mutationObserver from "./mutationObserver";

  let popup = getContext(POPUP);
  let state = getContext(STATE);

  function handleFocusChange() {
    const option = $popup.querySelector("[data-focused]");

    option?.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    });
  }
</script>

<style>
  .autocomplete-popup:not(.autocomplete-open) {
    display: none;
  }
</style>

<div 
  bind:this={$popup}
  class={cn(
    'autocomplete-popup',
    $state.isOpen && 'autocomplete-open'
  )}
>
  <div 
    tabindex="-1"
    role='listbox'
    id={$state.listId}
    class={'autocomplete-list'}
    use:mutationObserver={{
      subtree: true,
      attributes: true,
      attributeFilter: ['data-focused'],
      callback: handleFocusChange,
    }}
  >
    <slot open={$state.open} />
  </div>
</div>