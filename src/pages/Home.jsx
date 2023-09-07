import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
import Input from "../components/Input";
import ActiveTasks from "../components/ActiveTasks";
import CompletedTasks from "../components/CompletedTasks";
import { tasksContext } from "../context/Context";

const Home = () => {
  const { currentuser } = useContext(tasksContext);
  return (
    <>
      {localStorage.getItem("user") && (
        <Box
          sx={{
            height: "100vh",
            padding: "10px",
            bgcolor: "#2a2438",
            backgroundImage: "url(./homebg.svg)",
          }}
        >
          <Input />
          <Stack
            direction={{ xs: "column", md: "row" }}
            width={"100%"}
            justifyContent={"center"}
            alignItems={{ xs: "center", md: "normal" }}
            gap={2}
          >
            <ActiveTasks />
            <CompletedTasks />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Home;
