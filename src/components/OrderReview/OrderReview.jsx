import React from "react";
import "./OrderReview.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useStore from "../../common/utils/useStore";
import { getToken } from "../../common/utils/tokenUtil";

const steps = ["Items", "Select Address", "Confirm Order"];

function OrderReview() {
  const productObj = useStore((state) => state.productDetails);
  const addressObj = useStore((state) => state.address);
  const productQuantity = useStore((state) => state.quantity);

  const [activeStep, setActiveStep] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // API Call to save address
  const saveOrder = async () => {
    const data = {
      quantity: productQuantity,
      product: productObj[0].id,
      address: addressObj[0].id,
    };
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/orders",
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
        setOpen(true);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const palaceOrder = () => {
    saveOrder();
    setTimeout(() => {
      navigate("/home");
    }, 2500);
  };

  const goToBackPage = () => {
    navigate("/add-address");
  };

  return (
    <div className="container">
      <main
        className="main-content"
        style={{
          paddingTop: "90px",
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
        <div className="order-details">
          <div className="product-details">
            <h4>{productObj[0]?.name}</h4>
            <p>Quantity: {productQuantity}</p>
            <p>Category: {productObj[0]?.category}</p>
            <p>{productObj[0]?.description}</p>
            <p className="total-price">
              Total Price : ₹ {productObj[0]?.price}
            </p>
          </div>
          <div className="address-details">
            <h5>Address Details :</h5>
            <p className="bottom-spacing">{addressObj[0]?.name}</p>
            <p className="bottom-spacing">
              Contact Number: {addressObj[0]?.contactNumber}
            </p>
            <p className="bottom-spacing">
              {addressObj[0]?.street}, &nbsp; {addressObj[0]?.city}
            </p>
            <p className="bottom-spacing">{addressObj[0]?.landmark}</p>
            <p className="bottom-spacing">{addressObj[0]?.state}</p>
            <p className="bottom-spacing">{addressObj[0]?.zipcode}</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <button className="back-button" onClick={goToBackPage}>
          BACK
        </button>
        <button className="place-order-button" onClick={palaceOrder}>
          PLACE ORDER
        </button>
      </footer>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default OrderReview;
