import { Box, Button, Card, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tasksContext } from "../context/Context";
import axiosInstance from "../axios";

const Login = () => {
  const { setCurrentuser } = useContext(tasksContext);
  const nav = useNavigate();
  const initialState = {
    username: "test",
    password: "Password",
  };
  const [user, setuser] = useState(initialState);
  const [inputsFilled, setinputsFilled] = useState(false);

  useEffect(() => areInputsFilled(), [user]);

  const areInputsFilled = () => {
    let result;
    for (let key in user) user[key] == "" ? (result = false) : (result = true);
    setinputsFilled(result);
  };

  const handleLogin = async () => {
    try {
      const options = { withCredentials: true, credentials: "include" };
      const res = await axiosInstance.post("users/login", user, options);
      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentuser(res.data.user.name);
        setuser(initialState);
        nav("/home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(./taskManager.png)",
        backgroundSize: "contain",
        bgcolor: "black",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Card
        sx={{
          height: "60%",
          width: { xs: "90%", md: "40%" },
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          required
          onChange={(e) => {
            setuser({ ...user, username: e.target.value });
          }}
          value={user.username}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          value={user.password}
          onChange={(e) => {
            setuser({ ...user, password: e.target.value });
          }}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <Button
          variant="contained"
          disabled={!inputsFilled}
          endIcon={<LoginIcon />}
          onClick={handleLogin}
          sx={{ width: "25%" }}
        >
          Login
        </Button>
        <Typography variant="subtitle2">
          Don't have an account yet? <Link to={"/signup"}>Signup</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
