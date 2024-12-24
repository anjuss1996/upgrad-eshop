import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./NavigationBar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../common/utils/tokenUtil";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavigationBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem("isAdmin", false);
    navigate("/");
  };

  const showSearch = window.location.pathname === "/home" ? true : false;

  return (
    <Box className="sticky" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#3f51b5" }}>
          <div className="row">
            <div className="col-4 main-heading">
              <ShoppingCartIcon className="cart-icon">Filled</ShoppingCartIcon>
              upGrad E-Shop
            </div>
            <div className="col-4" style={{ justifyContent: "left" }}>
              {showSearch === true && (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              )}
            </div>
            <div className="col-4 right-actions">
              {window.location.pathname != "/" && (
                <div
                  className="link"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Home
                </div>
              )}
              {isAdmin() == true && (
                <div
                  className="link"
                  onClick={() => {
                    navigate("/add-product");
                  }}
                >
                  Add Product
                </div>
              )}
              {window.location.pathname != "/" && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f40257",
                    fontWeight: 300,
                    fontSize: "13.5px",
                    "&:hover": {
                      backgroundColor: "#d00248",
                    },
                  }}
                  onClick={logOut}
                >
                  LOGOUT
                </Button>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
