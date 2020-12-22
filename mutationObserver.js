export default function mutationObserver(node, { callback, ...options }) {
  let observer = new MutationObserver(callback);

  observer.observe(node, options);

  return {
    destroy() {
      observer.disconnect();
      observer = null;
    }
  };
}
