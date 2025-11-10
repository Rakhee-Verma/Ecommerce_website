import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  const apiUrl = `${import.meta.env.VITE_MOCK_BASE_URL}/users`;
  // const PostUrl = "https://69033beed0f10a340b23481e.mockapi.io/user/cartItems";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [`${name}Error`]: "" }));
  };
  const validateusername = () => {
    if (!isSignUp) return true;
    const name = formData.username.trim();
    if (!name) {
      setError((prev) => ({ ...prev, usernameError: "Please enter username" }));
      return false;
    } else if (name.length > 20) {
      setError((prev) => ({
        ...prev,
        usernameError: "Max 20 characters allowed",
      }));
      return false;
    }
    return true;
  };

  const checkMail = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,3}$/;
  const validateEmail = () => {
    const email = formData.email.trim();
    if (!email) {
      setError((prev) => ({ ...prev, emailError: "Please enter email" }));
      return false;
    } else if (!checkMail.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "Please enter a valid email",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const password = formData.password.trim();
    if (!password) {
      setError((prev) => ({
        ...prev,
        passwordError: "Please enter user password",
      }));
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    setError({
      usernameError: "",
      emailError: "",
      passwordError: "",
    });
    if (isSignUp) {
      if (!validateusername() || !validateEmail() || !validatePassword())
        return;
    } else {
      if (!validateEmail() || !validatePassword()) return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      if (isSignUp) {
        const data = await axios.post(apiUrl, payload);
        console.log(" SignUp successful", data);
        toast.success("SignUp successfull!");
        setIsSignUp(false);
        setFormData({ username: "", email: "", password: "" });
        return;
      }

      const res = await axios.get(apiUrl);
      const userByEmail = res.data.find((u) => u.email === formData.email);
      const userByPassword = res.data.find(
        (u) => u.password === formData.password
      );

      if (userByEmail && userByEmail.password === formData.password) {
        dispatch(setUser(userByEmail));
        toast.success("Login successfull!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        return;
      }
      const newErrors = {
        usernameError: "",
        emailError: "",
        passwordError: "",
      };
      if (!userByEmail) {
        newErrors.emailError = "Wrong email!";
      }
      if (!userByPassword || (userByEmail && userByEmail.password !== formData.password)) {
        newErrors.passwordError = "Wrong password!";
      }
      setError((prev) => ({ ...prev, ...newErrors }));
      console.log(
        "User not found or credentials mismatch. Please sign up or correct the details."
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          width: { xs: "90%", sm: "70%", md: "45%", lg: "35%" },
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          py: { xs: "1rem", sm: "1.5rem" },
          px: { xs: "1.5rem", sm: "2rem" },
          borderRadius: 2,
          marginTop: "2rem",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          sx={{ fontSize: "2rem" }}
          mb={2}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>

        {isSignUp && (
          <>
            <FormLabel>User Name</FormLabel>
            <TextField
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              sx={{ mb: "0.5rem", "& .MuiInputBase-root": { height: "45px" } }}
            />
            {error.usernameError && (
              <Typography
                sx={{ color: "red", fontSize: "0.8rem", mb: "0.5rem" }}
              >
                {error.usernameError}
              </Typography>
            )}
          </>
        )}

        <FormLabel>Email</FormLabel>
        <TextField
          placeholder="Enter Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: "0.5rem", "& .MuiInputBase-root": { height: "45px" } }}
        />
        {error.emailError && (
          <Typography sx={{ color: "red", fontSize: "0.8rem", mb: "0.5rem" }}>
            {error.emailError}
          </Typography>
        )}

        <FormLabel>User Password</FormLabel>
        <TextField
          placeholder="Enter User ID"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: "1rem", "& .MuiInputBase-root": { height: "45px" } }}
        />
        {error.passwordError && (
          <Typography sx={{ color: "red", fontSize: "0.8rem", mb: "0.5rem" }}>
            {error.passwordError}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 1,
            height: "45px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>

        <Typography sx={{ fontSize: "0.8rem", mt: 2, textAlign: "center" }}>
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => {
                  setIsSignUp(false);
                  setError({
                    usernameError: "",
                    emailError: "",
                    passwordError: "",
                  });
                  setFormData({ username: "", email: "", password: "" });
                }}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => {
                  setIsSignUp(true);
                  setError({
                    usernameError: "",
                    emailError: "",
                    passwordError: "",
                  });
                  setFormData({ username: "", email: "", password: "" });
                }}
              >
                Create one
              </span>
            </>
          )}
        </Typography>
      </Container>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};
