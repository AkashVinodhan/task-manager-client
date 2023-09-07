import React, { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import axiosInstance, { authHeader } from "../axios";

export const tasksContext = createContext();

const Context = ({ children }) => {
  const initialstate = {
    active: [],
    completed: [],
  };
  //to keep track of current user
  const [currentuser, setCurrentuser] = useState("");

  const [state, dispatch] = useReducer(reducer, initialstate);

  //store tasks in localstorage
  const saveToDB = async (active, completed) => {
    try {
      const options = { withCredentials: true, headers: authHeader() };
      const tasks = { active, completed };
      const { data } = await axiosInstance.put(
        "tasks/updateTasks",
        tasks,
        options
      );
    } catch (error) {
      console.log(error);
    }
  };

  const value = { state, dispatch, saveToDB, currentuser, setCurrentuser };

  return (
    <tasksContext.Provider value={value}>{children}</tasksContext.Provider>
  );
};

export default Context;
