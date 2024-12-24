import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { getToken } from "../../common/utils/tokenUtil";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken(), // Ensure you replace this with your authentication logic
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/home"); // Redirect to homepage after successful product addition
    } catch (err) {
      setError(err);
      console.error("Error adding product:", err);
      alert("Error adding product. Please check the console for details.");
    }
  };

  return (
    <div style={{ top: "90px", position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Add Product</h4>
      </div>
      <div
        style={{ justifyContent: "center", flexWrap: "wrap", display: "flex" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row-spacing field-width">
            <TextField
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Name"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Category"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={productData.manufacturer}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Manufacturer"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Available Items"
              name="availableItems"
              value={productData.availableItems}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              type="number"
              placeholder="Enter Available Items"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              type="number"
              placeholder="Enter Price"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Image URL"
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div className="row-spacing field-width">
            <TextField
              label="Enter Product Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Product Description"
              required
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#3f51b5",
                fontWeight: 500,
                fontSize: "12px",
                height: "25px",
                "&:hover": {
                  backgroundColor: "#2d3eae",
                },
              }}
            >
              ADD PRODUCT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
