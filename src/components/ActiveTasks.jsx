import React, { useContext, useEffect } from "react";
import { tasksContext } from "../context/Context";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import InputIcon from "@mui/icons-material/Input";

const ActiveTasks = () => {
  const {
    state: { active },
    dispatch,
  } = useContext(tasksContext);

  const handleMovetoCompleted = (id) => {
    dispatch({
      type: "MOVE_TO_COMPLETED",
      payload: id,
    });
  };

  const handleClick = (id) => {
    dispatch({
      type: "CHECKBOX_CLICK",
      payload: id,
    });
  };

  return (
    <>
      {active.length > 0 && (
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
                border: "1px solid white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Active tasks
            </Typography>
          </Box>
          <Card
            sx={{
              maxHeight: "400px",
              overflow: "auto",
              bgcolor: "#352f44",
            }}
          >
            <List>
              {active.map(({ name, id, isCompleted }) => {
                return (
                  <ListItem
                    component={motion.li}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.25 },
                    }}
                    key={id}
                    sx={{
                      bgcolor: "#5c5470",
                      color: "#dbd8e3",
                      margin: "5px auto",
                      width: "90%",
                      borderRadius: "5px",
                    }}
                    secondaryAction={
                      <Tooltip title={"Move to completed"} placement="left">
                        <IconButton
                          edge="end"
                          aria-label="move to completed"
                          sx={{ color: "white" }}
                          onClick={() => handleMovetoCompleted(id)}
                        >
                          <InputIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={() => handleClick(id)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={isCompleted}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": id }}
                          sx={{
                            color: "#2a2438",
                            "&.Mui-checked": {
                              color: "white",
                            },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={id}
                        primary={name}
                        sx={{
                          textDecoration: isCompleted ? "line-through" : "none",
                          fontStyle: isCompleted ? "italic" : "normal",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ActiveTasks;
