import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getAllProducts } from "../../common/utils/productUtil";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import useStore from "../../common/utils/useStore";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const setProductDetailInStore = useStore((state) => state.setProductDetail);
  const setProductQuantityInStore = useStore((state) => state.setQuantity);

  const submitOrder = () => {
    setProductDetailInStore(productDetails);
    setProductQuantityInStore(quantity);
    setTimeout(() => {
      navigate("/add-Address");
    }, 5);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getAllProducts();
        const details = response.filter((item) => item.id === id);
        setProductDetails(details);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <div className="page-container">
      {/* Product Section */}
      {productDetails.map((details) => {
        return (
          <div className="row mt-4">
            <div className="col-md-4">
              <img src={details.imageUrl} className="img-fluid" />
            </div>
            <div className="col-md-8">
              <div>
                <Stack direction="row" spacing={1}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>
                    {details.name}
                  </span>
                  <Chip
                    sx={{
                      backgroundColor: "#3f51b5",
                      color: "white",
                    }}
                    style={{ marginLeft: 10, marginTop: -5 }}
                    label={`Available Quantity: ${details.availableItems}`}
                  />
                </Stack>
              </div>

              <p style={{ paddingTop: 10 }}>
                Category:
                <span>
                  <strong style={{ paddingLeft: 5 }}>{details.category}</strong>
                </span>
              </p>
              <p>{details.description}</p>
              <h4 className="text-danger">₹ {details.price}</h4>
              <div className="form-group">
                <label htmlFor="quantityInput">Enter Quantity *</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantityInput"
                  value={quantity}
                  min="1"
                  style={{ width: 300 }}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
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
                onClick={submitOrder}
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
