import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditUserDetails = ({ onDataUpdated, user, setOpenDialog, openDialog, selectedUser }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: '',
    profile: ''
  });

  const navigate = useNavigate();

  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.username || "",
        email: user.email || "",
        password: user.password || user.password || "",
        profile: user.profile || "",
      });
      setImage(user.profile || null);
    } else {
      setFormData({ username: "", email: "", password: "", profile: "" });
      setImage(null);
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

  const validatePassword = () => {
    const password = formData.password.trim();
    if (password === "") {
      setError((prev) => ({ ...prev, passwordError: "Please enter user password" }));
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateusername() || !validateEmail() || !validatePassword()) return;
    const apiUrl = `${import.meta.env.VITE_MOCK_BASE_URL}/users`;

    try {
      const payload = { username: formData.username, email: formData.email, id: formData.id, password: formData.password, profile: formData.profile }
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(imgURL);
        setFormData((prev) => ({ ...prev, profile: reader.result  }));
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      setFormData((prev) => ({ ...prev, profile: imgURL }));
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(null)
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth
    // scroll="paper"
    >
      <DialogTitle
        sx={{ fontSize: "1.5rem", color: "#090f58ff", fontWeight: "bold", textAlign: "center" }}
      >
        {selectedUser ? "Edit User" : "Add New User"}
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ mb: "2rem" }} alignItems="center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Box
            onClick={handleAvatarClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            sx={{
              border: isDragging ? "2px dashed #1976d2" : "2px dashed transparent",
              borderRadius: "50%",
              p: 1,
              transition: "border-color 0.2s ease",
            }}
          >
            <Avatar
              src={image || null}
              alt="profile"
              sx={{
                width: 100,
                height: 100,
                cursor: "pointer",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                opacity: isDragging ? 0.6 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {formData.username.slice(0, 2).toUpperCase()}
            </Avatar>

          </Box>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Drag & drop or click to upload
          </Typography>
        </Stack>
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
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >

        <Button onClick={handleCloseDialog} color="secondary">
          Close
        </Button>
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
          {user ? "Update" : "Add New User "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
