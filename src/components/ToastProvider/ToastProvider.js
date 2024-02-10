import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

const defaultState = [];

function reducer(state, action) {
  switch (action.type) {
    case "createToast": {
      const { message, variant } = action;
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        },
      ];
    }
    case "dismissToast": {
      return state.filter((toast) => toast.id !== action.id);
    }
    case "dismissAllToasts": {
      return defaultState;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

function ToastProvider({ children }) {
  const [toasts, dispatch] = React.useReducer(reducer, defaultState);

  const handleEscapeKey = React.useCallback(() => {
    dispatch({ type: "dismissAllToasts" })
  }, [])

  useKeyDown('Escape', handleEscapeKey)

  function createToast({ variant, message }) {
    dispatch({ type: "createToast", variant, message });
  }

  function dismissToast(id) {
    dispatch({ type: "dismissToast", id });
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
