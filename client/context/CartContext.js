import { useState, useEffect, useReducer, createContext } from "react";

export const CartContext = createContext();

const initialState = {
  userCart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_CART":
      return {
        userCart: [...action.payload],
      };
    case "ADD_TO_CART":
      return {
        userCart: [...state.userCart, action.payload],
      };
    case "CLEAR_CART":
      return {
        userCart: [],
      };
    case "REMOVE_FROM_CART":
      return {
        userCart: state.userCart.filter((item) => item.id != action.payload),
      };
    default:
      throw new Error("Unknown action type");
  }
};

export function CartContextProvider(props) {
  const [isInit, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (isInit) {
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
    }
  }, [state]);

  useEffect(() => {
    dispatch({
      type: "ADD_TO_CART",
      payload: JSON.parse(localStorage.getItem("userCart")) || [],
    });
    setInit(true);
  }, []);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  );
}
