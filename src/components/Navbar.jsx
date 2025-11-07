import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography, TextField, InputAdornment, Popper, Fade, Paper, MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  filterProductByCategory,
  filterProductBySearch,
} from "../redux/productSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { searchUserDetails } from "../redux/searchSlice";
import axios from "axios";
import { fetchCartProducts } from "../redux/cardSlice";
import { logout } from "../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
export const Navbar = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const cartProduct = useSelector((state) => state.cart.cart);
  const productDetails = useSelector((state) => state.product.product);
  const userToken = useSelector((state) => state.auth.user);

  console.log(userToken.id, "userToken");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openMoreDetails, setopenMoreDetails] = useState(false);
  const categories = ["All", ...new Set(productDetails.map((p) => p.category))];

  // const storedToken = JSON.parse(localStorage.getItem("accessToken"));
  // const { username, id } = storedToken || {};

  // console.log("username", username);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch, cartProduct.length]);
  console.log(cartProduct.length, "cartProductLength");

  const totalProducts = cartProduct?.filter(
    (item) => item.userId === userToken?.id
  );

  const handleFilterIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    dispatch(filterProductByCategory(category));
    setOpenFilter(false);
  };
  const handleLogOutButton = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;
  const handleCartButton = () => {
    navigate("/card");
  };
  const handleSearchChange = (e) => {
    if (location.pathname === "/home") {
      dispatch(filterProductBySearch(e.target.value));
    } else if (location.pathname === "/formTable") {
      dispatch(searchUserDetails(e.target.value));
    }
  };
  const handleLogo = () => {
    navigate("/home");
  };
  const theme = useTheme();
  const handleMoreIcon = (e) => {
    setAnchorEl(e.currentTarget);
    setopenMoreDetails((prev) => !prev);
  };
  const handleTableButton = () => {
    console.log("clicked!")
    navigate("/formTable");
    setopenMoreDetails(false);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "5rem" }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  cursor: "pointer",
                  fontWeight: "900",
                  fontSize:'1.5rem',
                  background: "linear-gradient(90deg, #ff4b2b, #ff416c, #6a11cb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                onClick={handleLogo}
              >
                Ecommerce
              </Typography>

              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                onChange={handleSearchChange}
                sx={{
                  marginLeft: "4rem",
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
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {userToken?.username && (
                <Typography>{userToken.username.toUpperCase()}</Typography>
              )}
              <IconButton
                color="inherit"
                size="large"
                onClick={handleFilterIcon}
              >
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
              <IconButton
                color="inherit"
                size="large"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? <LightModeIcon /> : <NightlightRoundIcon />}
              </IconButton>
              <IconButton
                color="inherit"
                size="large"
                onClick={handleLogOutButton}
              >
                <LogoutIcon />
              </IconButton>
              <IconButton onClick={handleCartButton}>
                <ShoppingCartIcon fontSize="small" sx={{ color: "white" }} />
                <CartBadge
                  badgeContent={totalProducts?.length}
                  color="error"
                  overlap="circular"
                />
              </IconButton>
              <IconButton color="inherit" size="large" onClick={handleMoreIcon}>
                <MoreVertIcon />
              </IconButton>
              <Popper
                open={openMoreDetails}
                anchorEl={anchorEl}
                transition
                placement="bottom-end"
                style={{ zIndex: 1500 }} 
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={250}>
                    <Paper sx={{ p: 1, width: 120 }}>
                      <Typography
                        sx={{
                          color: "#5d5e8aff",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.8,
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          py: 0.5,
                          px: 1,
                        }}
                        onClick={handleTableButton}
                      >
                        Admin
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ToastContainer position="bottom-right"/>
    </>
  );
};
