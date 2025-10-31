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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${getApi}/${id}`);
      setUserDetails((prev) => prev.filter((u) => u.id !== id));
      alert("User deleted successfully!");
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

  const handleBack = () => {
    navigate("/");
  };
 const handleLogoutButton =()=>{
    localStorage.removeItem('accessToken')
    navigate('/')
 }
  return (
    <>
    <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Button variant="contained" onClick={handleBack}>
        <ArrowBackIcon /> Back
      </Button>
      <Button variant="contained" onClick={handleLogoutButton}><LogoutIcon/>Logout</Button>
    </Box>
      

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
                        transition
                        placement="bottom-end"
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
                                  fontWeight: "600",
                                  py: 0.5,
                                  px: 1,
                                }}
                                onClick={() => handleDelete(user.id)}
                              >
                                <DeleteIcon sx={{ fontSize: "1rem" }} /> Delete
                              </Typography>
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="xs"
          fullWidth
          scroll="paper"
        >
          <DialogTitle sx={{fontSize:'1.5rem',color:'#090f58ff',fontWeight:'bold'}}>
            {selectedUser ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogContent>
            <EditUserDetails
              user={selectedUser}
              setOpenDialog={setOpenDialog}
              onDataUpdated={handleDataUpdated}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
