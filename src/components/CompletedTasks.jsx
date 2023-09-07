import React, { useContext } from "react";
import { tasksContext } from "../context/Context";

import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CompletedTasks = () => {
  const { state, dispatch, saveToDB } = useContext(tasksContext);

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_FROM_COMPLETED",
      payload: id,
    });
  };

  return (
    <>
      {state.completed.length > 0 && (
        <Box sx={{ width: { xs: "90%", md: "40%" } }}>
          <Box
            sx={{
              color: "white",
              display: "grid",
              placeItems: "center",
              marginY: "20px",
            }}
          >
            <Typography
              sx={{
                border: "1px solid grey",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Completed tasks
            </Typography>
          </Box>
          <Card
            sx={{
              maxHeight: "400px",
              overflow: "auto",
              overflowX: "hidden",
              bgcolor: "#352f44",
            }}
          >
            <List>
              {state.completed.map(({ name, id }) => {
                return (
                  <AnimatePresence key={id}>
                    <ListItem
                      key={id}
                      component={motion.li}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      exit={{
                        opacity: 0,
                        x: 100,
                        transition: { duration: 0.25 },
                      }}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.25 },
                      }}
                      sx={{
                        bgcolor: "#5c5470",
                        color: "#dbd8e3",
                        margin: "5px auto",
                        width: "90%",
                      }}
                      secondaryAction={
                        <Tooltip title={"Delete Task"} placement="right">
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      }
                      disablePadding
                    >
                      <ListItemButton dense>
                        <ListItemText
                          id={id}
                          primary={name}
                          sx={{
                            textDecoration: "line-through",
                            color: "GrayText",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </AnimatePresence>
                );
              })}
            </List>
          </Card>
        </Box>
      )}
    </>
  );
};

export default CompletedTasks;
