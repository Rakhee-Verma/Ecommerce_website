import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Popper,
  Fade,
  Paper,
  Container,
  ClickAwayListener,
} from "@mui/material";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditUserDetails } from "./EditUserDetails";
import LogoutIcon from '@mui/icons-material/Logout';
export const FormTable = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const navigate = useNavigate();

  const getApi = "https://69033beed0f10a340b23481e.mockapi.io/user/users";

  const getUserData = async () => {
    try {
      const response = await axios.get(getApi);
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSettingButton = (event, rowIndex) => {
    if (openRow === rowIndex) {
      setOpenRow(null);
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpenRow(rowIndex);
    }
  };

  const handleEditButton = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
    setOpenRow(null);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${getApi}/${id}`);
      setUserDetails((prev) => prev.filter((u) => u.id !== id));
      setOpenRow(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddDetails = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleDataUpdated = () => {
    getUserData();
  };
  return (
    <>
      <Container sx={{ marginTop: "4rem" }}>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#090f58ff",
            }}
          >
            User Details Table
          </Typography>
          <Button variant="contained" onClick={handleAddDetails}>
            <AddIcon /> Add Details
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: 2, marginTop: "2rem", borderRadius: 2 }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#090f58ff",
                "& .MuiTableCell-root": {
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
              }}
            >
              <TableRow>
                <TableCell></TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>User Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userDetails.map((user, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ width: '100px' }}>
                    {user.profile ? (<img src={user.profile} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: "5px" }} />) : (<Box sx={{ width: '80px', height: '45px', border: 1, borderRadius: '5px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                      {user.username?.slice(0, 2).toUpperCase()}
                    </Box>)}

                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.password}</TableCell>

                  <TableCell>
                    <IconButton
                      onClick={(e) => handleSettingButton(e, i)}
                      sx={{ color: "#5d5e8aff" }}
                    >
                      <SettingsIcon />
                    </IconButton>

                    {openRow === i && (
  <Popper
    open={openRow === i}
    anchorEl={anchorEl}
    placement="bottom-end"
    transition
    disablePortal
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={250}>
        <Paper sx={{ p: 1, width: 120 }}>
          {/* ClickAwayListener INSIDE Paper */}
          <ClickAwayListener onClickAway={() => setOpenRow(null)}>
            <Box>
              <Typography
                sx={{
                  color: "#5d5e8aff",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  py: 0.5,
                  px: 1,
                }}
                onClick={() => handleEditButton(user)}
              >
                <EditIcon sx={{ fontSize: "1rem" }} /> Edit
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  color: "#5d5e8aff",
                  fontWeight: 600,
                  py: 0.5,
                  px: 1,
                }}
                onClick={() => handleDelete(user.id)}
              >
                <DeleteIcon sx={{ fontSize: "1rem" }} /> Delete
              </Typography>
            </Box>
          </ClickAwayListener>
        </Paper>
      </Fade>
    )}
  </Popper>
)}

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditUserDetails
          user={selectedUser}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
          onDataUpdated={handleDataUpdated}
          selectedUser={selectedUser}
        />
      </Container>
    </>
  );
};
