import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrese, fetchCartProducts, increse } from "../redux/cardSlice";
import axios from "axios";
import { useEffect } from "react";
export const AddCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);
  console.log(cart, "cartProduct");
  const api = `${import.meta.env.VITE_MOCK_BASE_URL}cartProducts`;
  const storedToken = JSON.parse(localStorage.getItem("accessToken"));
  const { id } = storedToken || {};
  const cartProduct = cart?.filter((item) => item.userId === id);
  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const handleProductVeiw = (product) => {
    navigate(`/veiwDetails/${product.id}`);
  };
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      dispatch(fetchCartProducts());
      console.log(`Item with id ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const increment = (id) => {
    dispatch(increse(id));
  };
  const decrement = (id, count) => {
    if (count > 1) {
      dispatch(decrese(id));
    } else {
      handleDeleteItem(id);
    }
  };
  if (loading) {
    return (
      <Box
        sx={{
          m: "1rem",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          justifyContent: "center",
        }}
      >
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              p: 2,
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: "8px" }}
            />
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
    );
  }
  return (
    <Box
      sx={{
        m: "1rem",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
        justifyContent: "center",
      }}
    >
      {cartProduct.length > 0 ? (
        cartProduct.map((product) => {
          return (
            <Card
              key={product.id}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                },
                width: { xs: "90%", sm: "80%", md: "300px" },
                transition: "transform 0.3s ease",
              }}
            >
              <Box onClick={() => handleProductVeiw(product)}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  height="200"
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "8px 8px 0 0",
                    p: 2,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
                  >
                    {product.title.length > 25
                      ? `${product.title.slice(0, 25)}...`
                      : product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      fontSize: { xs: "0.8rem", md: "0.9rem" },
                    }}
                  >
                    {product.description.length > 45
                      ? `${product.description.slice(0, 45)}...`
                      : product.description}
                  </Typography>
                  <Typography component="h5" sx={{ fontWeight: "bold" }}>
                    Price:${product.price * product.count}
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
                </CardContent>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "46%",
                    mb: 2,
                  }}
                >
                  <Button onClick={() => decrement(product.id, product.count)}>
                    {" "}
                    -
                  </Button>
                  <span>{product.count}</span>
                  <Button onClick={() => increment(product.id)}>+</Button>
                </Box>
              </Box>
            </Card>
          );
        })
      ) : (
        <Typography
          variant="h2"
          sx={{ gridColumn: "1 / -1", textAlign: "center" }}
        >
          No Product Available in Cart
        </Typography>
      )}
    </Box>
  );
};
