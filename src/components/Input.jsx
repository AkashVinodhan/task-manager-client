import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext, useEffect, useState } from "react";
import { tasksContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axiosInstance, { authHeader } from "../axios";

const Input = () => {
  const { state, dispatch, saveToDB, currentuser, setCurrentuser } =
    useContext(tasksContext);
  const nav = useNavigate();
  const [taskInput, settaskInput] = useState("");
  const [isfirstrender, setIsfirstrender] = useState(true);

  const handleChange = (e) => {
    settaskInput(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const options = { withCredentials: true, headers: authHeader() };
      const res = await axiosInstance.get("users/logout", options);
      if (res.status == 200) {
        localStorage.removeItem("user");
        setCurrentuser("");
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //*fetch data on login
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { withCredentials: true, headers: authHeader() };
        const {
          data: { active, completed },
        } = await axiosInstance.get("tasks/all", options);
        dispatch({
          type: "FETCH_FROM_DB",
          payload: { active, completed },
        });
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentuser(user.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsfirstrender(false);
  }, []);

  // *update DB if state changes
  useEffect(() => {
    if (!isfirstrender) {
      // to make sure doesn't run on page refresh
      saveToDB(state.active, state.completed);
    }
  }, [state]);

  const addTask = () => {
    //if input not empty
    if (taskInput != "") {
      const taskDetails = {
        name: taskInput,
        id: uuidv4(),
        isCompleted: false,
      };
      dispatch({
        type: "ADD_NEW_TASK",
        payload: taskDetails,
      });
      settaskInput("");
    }
  };

  return (
    <Box
      margin={"40px auto 20px auto"}
      width={"100%"}
      textAlign={"center"}
      sx={{ display: "grid", placeItems: "center", gap: 2 }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Welcome, <span style={{ fontWeight: "bold" }}>{currentuser}</span>
      </Typography>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "90%", md: "40%" },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Tasks"
          inputProps={{ "aria-label": "Enter Tasks" }}
          value={taskInput}
          onChange={handleChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px", color: "#2a2438" }}
          aria-label="directions"
          onClick={addTask}
          size="large"
        >
          <AddTaskSharpIcon />
        </IconButton>
      </Paper>
      {/* Logout */}
      <Tooltip title={"Logout"}>
        <IconButton
          onClick={handleLogout}
          sx={{
            position: "fixed",
            top: "10px",
            right: "10px",
            color: "white",
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
      {/* Username */}
    </Box>
  );
};

export default Input;
