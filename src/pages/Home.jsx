import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts} from "../redux/productSlice";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddtoCart } from "../redux/cardSlice";
import { toast, ToastContainer } from "react-toastify";
export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterProducts, loading } = useSelector((state) => state.product);
  const userDetails = localStorage.getItem("accessToken");
  const { id: userId } = JSON.parse(userDetails);
  console.log("filterProducts", filterProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const postCart = async (cardProduct) => {
    if (cardProduct.length === 0) return;

    try {
      const payload = { ...cardProduct, userId };
      const res = await axios.post(
        `${import.meta.env.VITE_MOCK_BASE_URL}/cartProducts`,
        payload
      );

      console.log("Cart posted successfully:", res);
    } catch (error) {
      console.error("Error posting cart data:", error);
    }
  };
  const handleAddToCart = (product) => {
    dispatch(AddtoCart(product));
    postCart(product);
    console.log("productttt", product);
  };
  const handleVeiwDetails = (product) => {
    navigate(`/veiwDetails/${product.id}`);
  };
  const handleCardVeiwDetails = (product) => {
    navigate(`/veiwDetails/${product.id}`);
  };
  // loading
  if (loading) {
    return (
      <Container sx={{ my: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {[...Array(8)].map((_, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                p: 2,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: "8px" }} />
              <Box sx={{ mt: 2 }}>
                <Skeleton width="80%" height={30} />
                <Skeleton width="60%" height={20} />
                <Skeleton width="40%" height={20} />
                <Skeleton width="50%" height={25} />
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Skeleton variant="rectangular" width={100} height={36} />
                  <Skeleton variant="rectangular" width={100} height={36} />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    );
  }
  // react-toastify
  const notify = () => toast.success("Product added to cart!");
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 4,
          justifyContent: "center",
        }}
      >
        {filterProducts.map((product) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                padding: "10px",
                "&:hover": {
                  backgroundColor:'rgba(0, 0, 0, 0.2)',
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
              key={product.id}
            >
              <Box onClick={() => handleCardVeiwDetails(product)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt="green iguana"
                  sx={{ objectFit: "contain" }}
                />
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.title.length > 15
                      ? `${product.title.slice(0, 15)}...`
                      : product.title}
                  </Typography>
                  <Typography>
                    {product.description.length > 35
                      ? `${product.description.slice(0, 35)}...`
                      : product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f9fafb",
                      color: "#4b5563",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {product.category}
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={product.rating.rate}
                      precision={0.5}
                      readOnly
                      sx={{ color: "#FFD700" }}
                    />
                    <Typography variant="body2">
                      ({product.rating.rate}) rating
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00C853",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    handleAddToCart(product);
                    notify();
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2962FF",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() => handleVeiwDetails(product)}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>
      <ToastContainer position="bottom-right" />
    </Container>
  );
};
