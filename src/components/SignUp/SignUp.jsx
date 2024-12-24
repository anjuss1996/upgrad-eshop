import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./SignUp.css";
import { handleSignUp } from "../../common/utils/authorization.js";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-input": {
            fontSize: "12px",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "12px",
            color: "grey",
          },
          "& .MuiInputLabel-root": {
            fontSize: "12px",
            color: "grey",
          },
        },
      },
    },
  },
});

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
  });

  const signUp = async () => {
    try {
      const response = await handleSignUp(formData);
      if (response) {
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 3002);
      }
    } catch (err) {
      console.log("Error!! signup failed!!");
    }
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="page-container">
        <span className="icon-container">
          <LockOutlinedIcon className="lock-icon">Outlined</LockOutlinedIcon>
        </span>
        <div className="sign-up">Sign up</div>

        <div className="row-spacing">
          <TextField
            id="outlined-basic"
            label="First Name *"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            placeholder="Enter First Name"
            autoComplete="off"
            className="row-sizing"
          />
        </div>
        <div className="row-spacing">
          <TextField
            id="outlined-basic"
            label="Last Name *"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            placeholder="Enter Last Name"
            autoComplete="off"
            className="row-sizing "
          />
        </div>
        <div className="row-spacing">
          <TextField
            id="outlined-basic"
            label="Email Address *"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            placeholder="Enter Email Address"
            autoComplete="off"
            className="row-sizing "
          />
        </div>
        <div className="row-spacing">
          <TextField
            id="outlined-basic"
            label="Password *"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            type="password"
            size="small"
            placeholder="Enter Password"
            autoComplete="off"
            className="row-sizing "
          />
        </div>
        <div className="row-spacing-button">
          <TextField
            id="outlined-basic"
            label="Confirm Password *"
            variant="outlined"
            type="password"
            size="small"
            placeholder="Enter Password"
            autoComplete="off"
            className="row-sizing "
          />
        </div>
        <div className="row-spacing">
          <TextField
            id="outlined-basic"
            label="Contact Number *"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            placeholder="Enter Contact Number"
            autoComplete="off"
            className="row-sizing "
          />
        </div>
        <div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              fontWeight: 500,
              fontSize: "12px",
              width: "280px",
              height: "25px",
              "&:hover": {
                backgroundColor: "#2d3eae",
              },
            }}
            onClick={signUp}
          >
            SIGN UP
          </Button>
        </div>
        <div className="row sign-up">
          <a className="sign-in-link " href="/">
            Already have an account? Sign In
          </a>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Signup successful! Redirecting you to the sign-in page...
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
