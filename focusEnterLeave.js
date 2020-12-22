function containsOrIs(node, target) {
  return !!target && (node === target || node.contains(target));
}

export default function focusEnterLeave(node) {
  function focusIn(e) {
    if (containsOrIs(node, e.target) && !containsOrIs(node, e.relatedTarget)) {
      node.dispatchEvent(
        new FocusEvent("focusenter", { relatedTarget: e.relatedTarget })
      );
    }
  }

  function focusOut(e) {
    if (containsOrIs(node, e.target) && !containsOrIs(node, e.relatedTarget)) {
      console.log("focusleave");
      node.dispatchEvent(
        new FocusEvent("focusleave", { relatedTarget: e.relatedTarget })
      );
    }
  }

  window.addEventListener("focusin", focusIn);
  window.addEventListener("focusout", focusOut);

  return {
    destroy() {
      window.removeEventListener(focusIn);
      window.removeEventListener(focusOut);
    }
  };
}
