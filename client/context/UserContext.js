import { useState, useEffect, useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
  userInfo: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        userInfo: action.payload,
      };
    case "REMOVE_USER":
      return {
        userInfo: {},
      };
    default:
      throw new Error();
  }
};

export function UserContextProvider(props) {
  const [isInit, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (isInit) {
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  }, [state]);

  useEffect(() => {
    dispatch({
      type: "ADD_USER",
      payload: JSON.parse(localStorage.getItem("userInfo")) || {},
    });
    setInit(true);
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
}
