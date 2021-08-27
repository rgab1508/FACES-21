import React, { useState, useEffect, useReducer } from "react";

export const UserContext = React.createContext();

const initialState = {
  userInfo: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export function UserContextProvider(props) {
  const [isInit, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (isInit) {
      localStorage.setItem("userData", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    dispatch({
      type: "ADD_USER",
      payload: userData ? userData.userInfo || {} : {},
    });
    if (userData && userData.isLoggedIn) {
      dispatch({ type: "LOGIN_USER" });
    }
    setInit(true);
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
}
