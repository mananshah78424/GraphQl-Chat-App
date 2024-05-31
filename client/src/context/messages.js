import React, { createContext, useReducer, useContext, act } from "react";
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  let usersCopy;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER_MESSAGE":
      const { username, messages } = action.payload;
      console.log(messages);
      usersCopy = [...state.users];
      const userIndex = usersCopy.findIndex((u) => u.username === username);
      console.log(userIndex);
      usersCopy[userIndex] = { ...usersCopy[userIndex], messages };
      console.log(usersCopy);
      return {
        ...state,
        users: usersCopy,
      };

    case "SET_SELECTED_USER":
      console.log("Now in set_selected_user");
      usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));
      return {
        ...state,
        users: usersCopy,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
