import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../common/utils/tokenUtil";
import TextField from "@mui/material/TextField"; // Import MUI TextField
import "./ModifyProduct.css";
import Button from "@mui/material/Button";

const ModifyProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    id: id,
    name: "",
    category: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken(),
          },
          body: JSON.stringify(productData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/home"); // Redirect to homepage after successful update
    } catch (err) {
      setError(err);
      console.error("Error updating product:", err); // Log the error for debugging
      alert("Error updating product. Please check the console for details."); // Optionally alert the user
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ top: "90px", position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Modify Product</h4>
      </div>
      <div
        style={{ justifyContent: "center", flexWrap: "wrap", display: "flex" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row-spacing field-width">
            <TextField
              label="Name "
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
              label="Category "
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
              label="Manufacturer "
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
              label="Available Items "
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
              label="Price "
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
              label="Image URL "
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
              label="Enter Product Description "
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              placeholder="Enter Product Description"
              required
              fullWidth
              multiline
              rows={4} // Adjust the number of rows to control height
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
              MODIFY PRODUCT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyProduct;
