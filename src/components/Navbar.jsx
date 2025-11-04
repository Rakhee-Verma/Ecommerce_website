import React, { useEffect, useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Dialog,
  Popper,
  Fade,
  Paper,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { filterProductByCategory, filterProductBySearch } from "../redux/productSlice";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
export const Navbar = ({ userDetails, darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProduct = useSelector(state => state?.cart?.cart || [])
  const productDetails = useSelector(state => state.product.product)
  console.log(productDetails, 'productDetails');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const categories = ["All", ...new Set(productDetails.map((p) => p.category))];
  const handleFilterIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    dispatch(filterProductByCategory(category));
    setOpenFilter(false);
  };
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
  const handleCartButton = () => {
    navigate('/card')
  }
  const handleSearchChange = (e) => {
    dispatch(filterProductBySearch(e.target.value));
  };
  const handleLogo = () => {
    navigate('/home')
  }
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", cursor: 'pointer' } }}
                onClick={handleLogo}
              >
                Website
              </Typography>
              <TextField variant="outlined"
                placeholder="Search..."
                size="small"
                onChange={handleSearchChange}
                sx={{
                  marginLeft: '4rem',
                  width: 300,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.paper 
                      : "#fff",
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary, 
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }} />

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', gap: 2 }}>
              <Typography>{username.username}</Typography>
              <IconButton color="inherit" size="large" onClick={handleFilterIcon}>
                <FilterAltIcon />
              </IconButton>

              {/* Filter Popper */}
              <Popper
                open={openFilter}
                anchorEl={anchorEl}
                transition
                placement="bottom-end"
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={250}>
                    <Paper sx={{ p: 1, width: 150 }}>
                      {categories.map((category, i) => (
                        <MenuItem
                          key={i}
                          onClick={() => handleCategorySelect(category)}
                          sx={{
                            fontSize: "0.9rem",
                            color: "#5d5e8aff",
                            fontWeight: "600",
                          }}
                        >
                          {category}
                        </MenuItem>
                      ))}
                    </Paper>
                  </Fade>
                )}
              </Popper>
              <IconButton color="inherit" size="large" onClick={() => setDarkMode((prev) => !prev)}>
                {darkMode ? (<LightModeIcon />) : (<NightlightRoundIcon />)}

              </IconButton>
              <IconButton color="inherit" size="large" onClick={handleLogOutButton}>
                <LogoutIcon />
              </IconButton>
              <IconButton onClick={handleCartButton}>
                <ShoppingCartIcon fontSize="small" sx={{ color: 'white' }} />
                <CartBadge badgeContent={cartProduct.length} color="error" overlap="circular" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

    </>


  );
};
