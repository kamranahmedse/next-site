/**
 * Util to add router events to anchors that weren't added with React Components
 */
export default function addRouterEvents(node, router, { href, as }) {
  function onClick(e) {
    if (!e.defaultPrevented) {
      e.preventDefault();
      router.push(href, as).then(success => {
        if (success) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    }
  }
  function onMouseEnter() {
    router.prefetch(href, as, { priority: true });
  }

  node.addEventListener('click', onClick);
  node.addEventListener('mouseenter', onMouseEnter);

  return () => {
    node.removeEventListener('click', onClick);
    node.removeEventListener('mouseenter', onMouseEnter);
  };
}
