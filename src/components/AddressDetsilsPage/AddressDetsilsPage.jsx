import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { getToken } from "../../common/utils/tokenUtil";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useStore from "../../common/utils/useStore";

const steps = ["Items", "Select Address", "Confirm Order"];

export default function AddressDetailsPage() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = React.useState(false);
  const setAddressInStore = useStore((state) => state.setAddress);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // API Call to get addresses when the component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Function to fetch addresses
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/addresses",
        {
          method: "GET",
          headers: {
            "x-auth-token": getToken(),
          },
        }
      );
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // API Call to save address
  const saveAddress = async (data) => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken(),
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Address added successfully!");
        fetchAddresses(); // Refresh the address list
        reset();
      } else {
        alert("Error saving address. Please try again.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const moveToNextPage = () => {
    // Check if address is selected, if not show snackbar
    const selectAddress = document.querySelector("select");

    if (selectAddress && selectAddress.value === "") {
      setOpen(true);
    } else {
      //  move to the order review page
      const address = addresses.filter((add) => add.id === selectAddress.value);
      setAddressInStore(address);
      navigate("/review-order");
    }
  };

  const moveToBackPage = () => {
    // logic to move to the previous step
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingTop: "90px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{
                  color: activeStep === index ? "#2d3eae" : "inherit",
                  ".MuiStepIcon-root.Mui-active": {
                    color: "#2d3eae",
                  },
                  ".MuiStepIcon-root.Mui-completed ": {
                    color: "#2d3eae",
                  },
                }}
              >
                <StepLabel
                  {...labelProps}
                  sx={{
                    color: activeStep === index ? "#2d3eae" : "inherit",
                    ".MuiStepIcon-root.Mui-active": {
                      color: "#2d3eae",
                    },
                    ".MuiStepIcon-root.Mui-completed ": {
                      color: "#2d3eae",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ marginBottom: "20px", marginLeft: "33%" }}>
          <p>Select Address</p>
          <select style={{ width: "450px", padding: "10px" }}>
            <option value="">Select...</option>
            {addresses.map((address, index) => (
              <option key={address.id} value={address.id}>
                {address.name} - {address.street}, {address.city}
              </option>
            ))}
          </select>
        </div>
        <p style={{ textAlign: "center" }}>-OR-</p>
        <p style={{ textAlign: "center" }}>Add Address</p>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            justifyContent: "center",
            flexWrap: "wrap",
            display: "flex",
          }}
        >
          <form
            onSubmit={handleSubmit(saveAddress)}
            style={{ display: "grid", gap: "10px", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="Name *"
              {...register("name", { required: "Name is required" })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.name ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}

            <input
              type="text"
              placeholder="Contact Number *"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact number should be 10 digits",
                },
              })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.contactNumber
                  ? "1px solid red"
                  : "1px solid #ccc",
              }}
            />
            {errors.contactNumber && (
              <span style={{ color: "red" }}>
                {errors.contactNumber.message}
              </span>
            )}

            <input
              type="text"
              placeholder="Street *"
              {...register("street", { required: "Street is required" })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.street ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errors.street && (
              <span style={{ color: "red" }}>{errors.street.message}</span>
            )}

            <input
              type="text"
              placeholder="City *"
              {...register("city", { required: "City is required" })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.city ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errors.city && (
              <span style={{ color: "red" }}>{errors.city.message}</span>
            )}

            <input
              type="text"
              placeholder="State *"
              {...register("state", { required: "State is required" })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.state ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errors.state && (
              <span style={{ color: "red" }}>{errors.state.message}</span>
            )}

            <input
              type="text"
              placeholder="Landmark"
              {...register("landmark")}
              style={{
                padding: "10px",
                width: "300px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="text"
              placeholder="Zip Code *"
              {...register("zipcode", {
                required: "Zip code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Zip code should be 6 digits",
                },
              })}
              style={{
                padding: "10px",
                width: "300px",
                border: errors.zipcode ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errors.zipcode && (
              <span style={{ color: "red" }}>{errors.zipcode.message}</span>
            )}
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: 20 }}
                sx={{
                  backgroundColor: "#3f51b5",
                  fontWeight: 500,
                  fontSize: "12px",
                  width: "170px",
                  height: "35px",
                  "&:hover": {
                    backgroundColor: "#2d3eae",
                  },
                }}
              >
                SAVE ADDRESS
              </Button>
              <div>
                <Button
                  variant="contained"
                  style={{ marginTop: 20 }}
                  sx={{
                    backgroundColor: "transparent",
                    fontWeight: 500,
                    fontSize: "12px",
                    width: "100px",
                    height: "35px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={moveToBackPage}
                >
                  BACK
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="contained"
                  style={{ marginTop: 20 }}
                  sx={{
                    backgroundColor: "#3f51b5",
                    fontWeight: 500,
                    fontSize: "12px",
                    width: "100px",
                    height: "35px",
                    "&:hover": {
                      backgroundColor: "#2d3eae",
                    },
                  }}
                  onClick={moveToNextPage}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Set position to top-right
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please select an address
        </Alert>
      </Snackbar>
    </div>
  );
}
