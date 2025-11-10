import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Popper,
  Fade,
  Paper,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  filterProductByCategory,
  filterProductBySearch,
} from "../redux/productSlice";
import { searchUserDetails } from "../redux/searchSlice";
import { fetchCartProducts } from "../redux/cardSlice";
import { logout } from "../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";

export const Navbar = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openMoreDetails, setopenMoreDetails] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartProduct = useSelector((state) => state.cart.cart);
  const productDetails = useSelector((state) => state.product.product);
  const userToken = useSelector((state) => state.auth.user);

  const categories = ["All", ...new Set(productDetails.map((p) => p.category))];

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch, cartProduct.length]);

  const totalProducts = cartProduct?.filter(
    (item) => item.userId === userToken?.id
  );

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  const handleFilterIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    dispatch(filterProductByCategory(category));
    setOpenFilter(false);
  };

  const handleSearchChange = (e) => {
    if (location.pathname === "/home") {
      dispatch(filterProductBySearch(e.target.value));
    } else if (location.pathname === "/formTable") {
      dispatch(searchUserDetails(e.target.value));
    }
  };

  const handleLogOutButton = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const handleCartButton = () => {
    navigate("/card");
  };

  const handleLogo = () => {
    navigate("/home");
  };

  const handleMoreIcon = (e) => {
    setAnchorEl(e.currentTarget);
    setopenMoreDetails((prev) => !prev);
  };

  const handleTableButton = () => {
    navigate("/formTable");
    setopenMoreDetails(false);
  };

  const toggleDrawer = (open) => () => {
    setMobileMenuOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "900",
              cursor: "pointer",
              fontSize: { xs: "1.2rem", md: "1.6rem" },
              background: "linear-gradient(90deg, #ff4b2b, #ff416c, #6a11cb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={handleLogo}
          >
            Ecommerce
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              ml: 4,
              flexGrow: 1,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              onChange={handleSearchChange}
              sx={{
                width: { sm: 220, md: 300 },
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : "#fff",
                borderRadius: "8px",
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
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {userToken?.username && (
              <Typography sx={{ mr: 1 }}>
                {userToken.username.toUpperCase()}
              </Typography>
            )}

            <IconButton color="inherit" onClick={handleFilterIcon}>
              <FilterAltIcon />
            </IconButton>
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
                          fontWeight: "600",
                          color: "#5d5e8aff",
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
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? <LightModeIcon /> : <NightlightRoundIcon />}
            </IconButton>

            <IconButton color="inherit" onClick={handleCartButton}>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge
                badgeContent={totalProducts?.length}
                color="error"
                overlap="circular"
              />
            </IconButton>

            <IconButton color="inherit" onClick={handleLogOutButton}>
              <LogoutIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleMoreIcon}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, 
        }}
        PaperProps={{
          sx: {
            mt: { xs: "56px", sm: "64px" },
            height: "auto",
            backgroundColor: darkMode ? "#121212" : "#fff",
          },
        }}
      >
        <Box sx={{ width: 240, p: 2 }}>
          <List>
            <ListItemButton onClick={handleCartButton}>
              <ListItemText primary="Cart" />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                handleFilterIcon();
                setMobileMenuOpen(false);
              }}
            >
              <ListItemText primary="Filter Products" />
            </ListItemButton>

            <ListItemButton onClick={() => setDarkMode((p) => !p)}>
              <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
            </ListItemButton>

            <ListItemButton onClick={handleTableButton}>
              <ListItemText primary="Admin Panel" />
            </ListItemButton>

            <ListItemButton onClick={handleLogOutButton}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <ToastContainer position="bottom-right" />
      <Toolbar /> 
    </>
  );
};
