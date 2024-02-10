import React from 'react'

function useKeyDown(keyCode, callbackFn) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      callbackFn?.(event)
    }
    window.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callbackFn]);

}

export default useKeyDown