import React from "react";
import "./SignIn.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { handleLogin } from "../../common/utils/authorization.js";
import { useNavigate } from "react-router-dom";

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
        },
      },
    },
  },
});

export default function SignIn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await handleLogin(values);
        const isAdmin = data?.roles.includes("ADMIN");
        localStorage.setItem("isAdmin", isAdmin);
        if (data) {
          navigate("/home");
        }
      } catch (err) {
        console.log("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={formik.handleSubmit} className="page-container">
        <span className="icon-container">
          <LockOutlinedIcon className="lock-icon">Outlined</LockOutlinedIcon>
        </span>
        <div className="sign-in">Sign in</div>

        <div className="row-spacing">
          <TextField
            id="email-field"
            label="Email Address *"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            size="small"
            placeholder="Enter Email Address"
            autoComplete="off"
            className="text-field row-sizing"
            InputLabelProps={{
              shrink: true,
            }}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div className="row-spacing-button">
          <TextField
            id="password-field"
            label="Password *"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            size="small"
            placeholder="Enter Password"
            autoComplete="off"
            className="text-field row-sizing"
            InputLabelProps={{
              shrink: true,
            }}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
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
          >
            SIGN IN
          </Button>
        </div>
        <div className="row sign-up">
          <a className="sign-up-link" href="/signUp">
            Don't have an account? Sign Up
          </a>
        </div>
      </form>
    </ThemeProvider>
  );
}
