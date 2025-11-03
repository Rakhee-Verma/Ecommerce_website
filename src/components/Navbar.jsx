import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = ({ userDetails }) => {
   const cartProduct = useSelector(state => state?.cart?.cart || []);
  const navigate = useNavigate()
  const handleLogOutButton = () => {
    localStorage.removeItem('accessToken');
    navigate('/')
  }
  const username = JSON.parse(userDetails)
  console.log(username.username, 'userDetails');
  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;
const handleCartButton=()=>{
  navigate('/card')
}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Website
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Typography>{username.username}</Typography>

          <IconButton color="inherit" size="large" onClick={handleLogOutButton}>
            <LogoutIcon />
          </IconButton>
          <IconButton onClick={handleCartButton}>
            <ShoppingCartIcon fontSize="small" sx={{ color: 'white' }} />
            <CartBadge badgeContent={cartProduct.length} color="error" overlap="circular" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
