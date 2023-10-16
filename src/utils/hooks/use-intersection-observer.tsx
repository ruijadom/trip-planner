import { useCallback, useRef, useEffect } from "react";

/**
 * A hook that creates an IntersectionObserver to monitor
 * when a target element enters the viewport and invokes a callback function.
 *
 * @param callback - The callback function to be invoked when the target element
 * enters the viewport.
 * @param options - The options for the IntersectionObserver.
 * @returns A function ref that should be assigned to the target DOM element.
 */
export default function useIntersectionObserver(
  callback: () => void,
  options?: IntersectionObserverInit,
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        }, options);

        observer.current.observe(node);
      }
    },
    [callback, options]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return ref;
}
