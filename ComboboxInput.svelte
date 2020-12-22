<script>
  import { getContext, createEventDispatcher, tick } from "svelte";
  import { EMPTY, POPUP, INPUT, STATE } from "./context";
  import { options as ValueMap } from "./ComboboxListOption.svelte";
  import activedescendant from "./activedescendant";
  import popper from "./popper";

  const popup = getContext(POPUP);
  const ctx = getContext(STATE);
  const dispatch = createEventDispatcher();

  export let popperOptions = undefined;
  export let input = null;
  export let value = "";
  export let disabled = false;
  export let readonly = false;

  $: $ctx.value = value;

  const handleSelectItem = ($ctx.onSelect = async (focused, originalEvent) => {
    if (focused === EMPTY || disabled || readonly) {
      return;
    }

    $ctx.close();

    value = focused.value;

    input.focus();
    await tick();
    dispatch("selectitem", {
      value,
      originalEvent,
      data: focused.data
    });
    dispatch("valuechange", {
      value,
      originalEvent,
      data: focused.data,
      action: "select"
    });
  });

  function handleInput(e) {
    value = e.target.value;
    $ctx.open();
    dispatch("valuechange", {
      value,
      action: "input",
      originalEvent: e,
      data: ValueMap.get(value)?.data ?? null
    });
  }

  function handleKeyDown(e) {
    if (disabled || readonly) return;

    let focused = $ctx.focusedOption;
    let options = Array.from($popup.querySelectorAll('[role="option"]'));
    let idx = options.findIndex(opt => opt.matches("[data-focused]"));

    let option;
    if (e.key === "ArrowUp") option = options[Math.max(idx - 1, 0)];
    if (e.key === "ArrowDown") {
      if (!$ctx.isOpen) {
        $ctx.open();
        e.preventDefault();
      } else {
        option = options[Math.min(idx + 1, options.length - 1)];
      }
    }
    if (
      e.key === "Home" &&
      !e.shiftKey &&
      $ctx.isOpen &&
      $ctx.focusedOption !== EMPTY
    ) {
      option = options[0];
    }
    if (
      e.key === "End" &&
      !e.shiftKey &&
      $ctx.isOpen &&
      $ctx.focusedOption !== EMPTY
    ) {
      option = options[options.length - 1];
    }
    if (e.key === "Escape") {
      e.preventDefault();
      $ctx.close();
    }
    if ((e.key === "Enter" || e.key === " ") && focused !== EMPTY) {
      e.preventDefault();
      handleSelectItem(focused, e);
      return;
    }
    if (option) {
      e.preventDefault();
      $ctx.focusedOption = ValueMap.get(option);
    }
  }
</script>

<input 
  {...$$restProps}
  {value}
  {readonly}
  {disabled}
  on:blur
  on:focus
  on:change
  on:input
  on:input={handleInput}
  on:keydown={handleKeyDown}
  bind:this={input}
  id={$ctx.id}
  type='text' 
  role='combobox'
  autocomplete="off"
  aria-owns={$ctx.listId}
  aria-controls={$ctx.listId}
  aria-expanded={$ctx.isOpen}
  aria-autocomplete="list"
  class="autocomplete-input"
  use:activedescendant={{ 
    id: $ctx.activeId, 
    focused: $ctx.focusedOption
  }}
  use:popper={{ 
    placement: 'bottom-start',
    ...popperOptions,
    enabled: $ctx.open,
    popperElement: $popup, 
    modifiers: popperOptions?.modifiers || [
      {
        name: 'offset',
        options: { offset: [0, 4] },
      },
      { name: 'flip' },
      // {
      //   name: "sameWidth",
      //   enabled: true,
      //   fn: ({ state }) => {
      //      state.styles.popper.width = `${state.rects.reference.width}px`;
      //   },
      //   phase: "beforeWrite",
      //   requires: ["computeStyles"],
      // }
    ]
  }} 
/>