import { Box, Button, Card, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tasksContext } from "../context/Context";
import axiosInstance from "../axios";

const Signup = () => {
  const { setCurrentuser } = useContext(tasksContext);
  const nav = useNavigate();
  const initialState = {
    name: "",
    email: "",
    username: "",
    password: "",
  };
  const [user, setuser] = useState(initialState);
  const [inputsFilled, setinputsFilled] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const options = { withCredentials: true, credentials: "include" };
      const res = await axiosInstance.post("users/signup", user, options);
      if (res.status == 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentuser(setCurrentuser(res.data.user.name));
        setuser(initialState);
        nav("/home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => areInputsFilled(), [user]);

  const areInputsFilled = () => {
    let result;
    for (let key in user) user[key] == "" ? (result = false) : (result = true);
    setinputsFilled(result);
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
        component="form"
        onSubmit={handleSignup}
        sx={{
          width: { xs: "90%", md: "50%" },
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Signup
        </Typography>
        <TextField
          label="Name"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, name: e.target.value });
          }}
          value={user.name}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Email"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, email: e.target.value });
          }}
          value={user.age}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Username"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, username: e.target.value });
          }}
          value={user.username}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Password"
          required
          variant="outlined"
          type="password"
          value={user.password}
          onChange={(e) => {
            setuser({ ...user, password: e.target.value });
          }}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <Button
          type="submit"
          disabled={!inputsFilled}
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={handleSignup}
          sx={{ width: { xs: "40%", md: "25%" } }}
        >
          Signup
        </Button>
        <Typography variant="subtitle2">
          Already have an account? <Link to={"/"}>Login</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
