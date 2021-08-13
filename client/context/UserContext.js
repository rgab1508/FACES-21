import React, { useState, useEffect, useReducer } from "react";

export const UserContext = React.createContext();

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
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  }, [state]);

  useEffect(() => {
    dispatch({
      type: "ADD_USER",
      payload: JSON.parse(sessionStorage.getItem("userInfo")) || {},
    });
    setInit(true);
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
}
