import { EMPTY } from "./context";

/**
 * Sets aria-activedescendant forceably when the inputs change
 * So that SR's read out the value each time the ID moves
 */
export default function activedescendant(node, options) {
  function update({ focused, id }) {
    node.removeAttribute("aria-activedescendant");
    if (id && focused !== EMPTY) {
      node.setAttribute("aria-activedescendant", id);
    }
  }

  update(options);
  return {
    update
  };
}
