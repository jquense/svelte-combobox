import { createPopper } from "@popperjs/core";

export default function usePopper(node, options = {}) {
  let popper;
  function update({ popperElement, enabled, ...options }) {
    if (!enabled) {
      popper?.destroy();
      return;
    }
    if (!popperElement) return;

    popper = createPopper(node, popperElement, options);
  }

  update(options);

  return {
    update,
    destroy() {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    }
  };
}
