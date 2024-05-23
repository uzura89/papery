import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useClickOutsideEffect = (
  ref: any,
  onClickOutside: () => void,
  active: boolean
) => {
  useEffect(() => {
    if (!active) {
      return;
    }
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    // Bind the event listener
    if (window.PointerEvent) {
      document.addEventListener("pointerdown", handleClickOutside);
    } else {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      if (window.PointerEvent) {
        document.removeEventListener("pointerdown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [ref, active]);
};
