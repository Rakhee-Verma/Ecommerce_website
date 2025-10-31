import React, { useEffect, useState } from "react";
import { Button, Container, FormLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditUserDetails = ({onDataUpdated, user, setOpenDialog }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password:'',
  });

  const navigate = useNavigate();

  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.username || "",
        email: user.email || "",
        password: user.password || user.password || "",
      });
    } else {
      setFormData({ username: "", email: "", password: "" });
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [`${name}Error`]: "" }));
  };
  const validateusername = () => {
    const name = formData.username.trim();
    if (name === "") {
      setError((prev) => ({ ...prev, usernameError: "Please enter user name" }));
      return false;
    } else if (name.length > 20) {
      setError((prev) => ({ ...prev, usernameError: "Max 20 characters allowed" }));
      return false;
    }
    return true;
  };

  const checkMail = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,3}$/;
  const validateEmail = () => {
    const email = formData.email.trim();
    if (email === "") {
      setError((prev) => ({ ...prev, emailError: "Please enter email" }));
      return false;
    } else if (!checkMail.test(email)) {
      setError((prev) => ({ ...prev, emailError: "Please enter a valid email address" }));
      return false;
    }
    return true;
  };

  const validatePassword= () => {
    const password = formData.password.trim();
    if (password === "") {
      setError((prev) => ({ ...prev, passwordError: "Please enter user password" }));
      return false;
    }
    return true;
  };
 const handleSubmit = async () => {
  if(!validateusername()||!validateEmail()||!validatePassword())return;
    const apiUrl = "https://69033beed0f10a340b23481e.mockapi.io/user/users";

    try {
      const payload = { username: formData.username, email: formData.email, id: formData.id, password:formData.password}
      if (user) {
        await axios.put(`${apiUrl}/${user.id}`, payload);
        console.log("User updated successfully!");
      } else {
        await axios.post(apiUrl, payload);
        console.log("User added successfully!");
      }

      if (typeof setOpenDialog === "function") setOpenDialog(false);
      if (typeof onDataUpdated === "function") onDataUpdated(); 
    } catch (error) {
      console.error("Error saving data:", error);
    }
    navigate('/formTable')
  };

  return (
    <Container
      sx={{
        width: "100%" ,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        py: { xs: "1rem", sm: "1.5rem" },
        px: { xs: "1.5rem", sm: "2rem" },
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <FormLabel>User Name</FormLabel>
      <TextField
        placeholder="Enter User Name"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        sx={{
          mb: "0.5rem",
          "& .MuiInputBase-root": { height: "45px" },
        }}
      />
      {error.usernameError && (
        <Typography sx={{ color: "red", fontSize: "0.8rem", mb: "0.5rem" }}>
          {error.usernameError}
        </Typography>
      )}

      <FormLabel>Email</FormLabel>
      <TextField
        placeholder="Enter Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        sx={{
          mb: "0.5rem",
          "& .MuiInputBase-root": { height: "45px" },
        }}
      />
      {error.emailError && (
        <Typography sx={{ color: "red", fontSize: "0.8rem", mb: "0.5rem" }}>
          {error.emailError}
        </Typography>
      )}

      <FormLabel>User password</FormLabel>
      <TextField
        placeholder="Enter User password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        sx={{
          mb: "1rem",
          "& .MuiInputBase-root": { height: "45px" },
        }}
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
          fontSize:'1.2rem'
        }}
      >
        {user ? "Update" : "Add New User "}
      </Button>
    </Container>
  );
};
