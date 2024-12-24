import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllProducts,
  getProductCategories,
} from "../../common/utils/productUtil";
import { isAdmin } from "../../common/utils/tokenUtil";
import "./Home.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../common/utils/tokenUtil";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Home() {
  // State to store all products fetched from the server
  const [allProducts, setAllProducts] = useState([]);
  // State to store currently displayed products based on filters/sorting
  const [products, setProducts] = useState([]);
  // State to store product categories
  const [categories, setCategories] = useState([]);
  // State to store the currently selected category filter
  const [currentCategory, setCurrentCategory] = React.useState("");
  // State to store the current sorting option
  const [sort, setSort] = React.useState("");

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDialogClickOpen = (product) => {
    setProductToDelete(product);
    setDialogOpen(true);
  };

  const handleDialogClose = async (reason) => {
    if (reason === "ok" && productToDelete) {
      try {
        const response = await fetch(
          `https://dev-project-ecommerce.upgrad.dev/api/products/${productToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              "x-auth-token": getToken(),
            },
          }
        );
        if (response.ok) {
          setMessage(`Product ${productToDelete.name} deleted successfully.`);
          setOpen(true);
          fetchProducts();
        } else {
          console.log(`Failed to delete product ${productToDelete.name}.`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    setDialogOpen(false);
    setProductToDelete(null);
  };

  const [message, setMessage] = useState("");

  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Handle sorting changes for products
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);

    if (value === "default" || value === "") {
      // Reset sorting to default based on category
      if (currentCategory != null && currentCategory !== "") {
        const defaultSortedProducts = allProducts.filter(
          (product) => product.category === currentCategory
        );
        setProducts(defaultSortedProducts);
      } else {
        setProducts(allProducts);
      }
    } else if (value === "highestFirst") {
      // Sort products by price in descending order
      const sortedProducts = products?.sort(
        (first, second) => Number(second.price) - Number(first.price)
      );
      setProducts(sortedProducts);
    } else if (value === "lowestFirst") {
      // Sort products by price in ascending order
      const sortedProducts = products?.sort(
        (first, second) => Number(first.price) - Number(second.price)
      );
      setProducts(sortedProducts);
    }
  };

  // Handle category filter changes
  const handleCategoryChange = (event, newCategory) => {
    setCurrentCategory(newCategory);
    setSort(""); // Reset sorting when category changes

    const targetEvent = {
      target: {
        value: "",
      },
    };
    handleSortChange(targetEvent); // Reset sorting logic

    // Filter products based on the selected category
    const filteredProducts = allProducts.filter(
      (item) => item.category === newCategory
    );
    if (newCategory === null) {
      setProducts(allProducts);
    } else {
      setProducts(filteredProducts);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Navigate to the product details page for a specific product
  const goToProductDetails = (id) => {
    navigate("/product/" + id);
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setAllProducts(response); // Store all products in state
      setProducts(response); // Initially display all products
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products and categories from the server when the component mounts
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await getProductCategories();
        setCategories(response); // Store categories in state
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProductCategories();
    fetchProducts();
  }, []);

  const deleteProduct = (product) => {
    handleDialogClickOpen(product);
  };

  const modifyProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="page-container">
      {/* Category Filter Section */}
      <div
        style={{
          justifyContent: "space-around",
          paddingBottom: 20,
        }}
      >
        {categories.map((category) => {
          return (
            <ToggleButtonGroup
              key={category}
              color="primary"
              value={currentCategory}
              exclusive
              onChange={handleCategoryChange}
              aria-label="Category Filter"
              style={{ paddingRight: 1 }}
            >
              <ToggleButton value={category}>{category}</ToggleButton>;
            </ToggleButtonGroup>
          );
        })}
      </div>

      {/* Sorting Options Section */}
      <div className="card-container">
        <FormControl sx={{ m: 1, minWidth: 220, marginLeft: "154px" }}>
          <Select
            value={sort || ""}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ "aria-label": "Sort Options" }}
            size="small"
          >
            <MenuItem value="" disabled>
              Choose Sort Option
            </MenuItem>
            <MenuItem value={"default"}>Default</MenuItem>
            <MenuItem value={"highestFirst"}>Price: High to Low</MenuItem>
            <MenuItem value={"lowestFirst"}>Price: Low to High</MenuItem>
            <MenuItem value={"newest"}>Newest</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Product Cards Section */}
      <div>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", columnGap: 10, rowGap: 4 }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: 320,
                borderRadius: 2,
                height: 400,
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                style={{ objectFit: "cover" }}
              />

              {/* Product Details */}
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: 0,
                    paddingBottom: 10,
                  }}
                >
                  <div
                    className="hover-text"
                    style={{
                      textAlign: "left",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </div>
                  <div style={{ textAlign: "right" }}>₹ {product.price}</div>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    overflow: "hidden",
                    minHeight: 80,
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>

              {/* Action Buttons */}
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ textTransform: "uppercase", fontWeight: "bold" }}
                  onClick={() => goToProductDetails(product.id)}
                >
                  Buy
                </Button>
                {isAdmin() === true && (
                  <Box>
                    <IconButton color="default" size="small">
                      <EditIcon
                        onClick={() => {
                          modifyProduct(product.id);
                        }}
                      />
                    </IconButton>
                    <IconButton color="default" size="small">
                      <DeleteIcon onClick={() => deleteProduct(product)} />
                    </IconButton>
                  </Box>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>

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
          {message}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm deletion of the product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {productToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose("ok")}>OK</Button>
          <Button onClick={() => handleDialogClose("cancel")} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
