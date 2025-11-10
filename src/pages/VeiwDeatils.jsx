import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AddtoCart, fetchCartProducts } from "../redux/cardSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
export const GoldRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  "& .MuiRating-iconEmpty": {
    color: "#ddd",
  },
});

export const VeiwDetails = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const { id } = useParams();

  const userDetails = localStorage.getItem("accessToken");
  const { id: userId } = JSON.parse(userDetails);

  console.log("id", id);
  const allCartProducts = cart?.filter((item) => item.userId === userId);

  async function getProductDetails() {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/${id}`
    );
    console.log("res", res);
    return res.data;
  }

  const { data: product, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getProductDetails(id),
  });

  console.log(product, "product");
  const increment = () => {
    setCount((prev) => (prev += 1));
  };
  const decrement = () => {
    if (count > 1) {
      setCount((prev) => (prev -= 1));
    }
  };
  const postCartData = async (product) => {
    try {
      const payload = { ...product, userId, productId: product.id };

      const res = await axios.post(
        `${import.meta.env.VITE_MOCK_BASE_URL}/cartProducts`,
        payload
      );

      console.log("Cart posted successfully:", res.data);
    } catch (error) {
      console.error("Error posting cart data:", error);
    }
  };

  const handleAddToCart = (product) => {
    const isAlready = allCartProducts?.some(
      (item) => Number(item.productId) === Number(product.id)
    );
    console.log("isAlready+++", isAlready);
    if (isAlready) {
      toast.warn("Already exist");
      return;
    }
    dispatch(AddtoCart(product));
    postCartData(product);
    toast.success("Product added to cart !");
  };

  console.log("rating", product?.rating?.rate);
  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 4,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 4,
              py: 3,
              px: 2,
              width: "90%",
              mx: "auto",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: 3,
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={250}
              height={200}
              sx={{
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.08)",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="80%" height={30} />
              <Skeleton width="90%" height={20} />
              <Skeleton width="70%" height={20} />
              <Skeleton width="50%" height={25} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", gap: 1, my: 2 }}>
                <Skeleton variant="rectangular" width={100} height={36} />
                <Skeleton variant="rectangular" width={100} height={36} />
                <Skeleton variant="rectangular" width={100} height={36} />
              </Box>
              <Skeleton variant="rectangular" width={200} height={36} />
            </Box>
          </Card>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 4,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
            my: 4,
            py: 3,
            px: 2,
            width: "90%",
            mx: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: 3,
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={product?.image}
            alt={product?.title}
            sx={{
              objectFit: "contain",
              width: { xs: "100%", sm: "250px" },
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              p: 2,
            }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {product?.title}
            </Typography>
            <Typography variant="body1">{product?.description}</Typography>
            <Typography variant="p" sx={{ color: "text.secondary", mb: 1 }}>
              {product?.category}
            </Typography>
            <Box sx={{ display: {lg:"flex", sm:'block'} }}>
              <Typography variant="h5" sx={{ pt: 2 }}>
                ${product?.price * count}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: 2,
                    marginLeft: {lg:"2rem",sm:0},
                  }}
                >
                  <span onClick={decrement} style={{ marginInline: "1rem" }}>
                    {" "}
                    -
                  </span>
                  <span>{count}</span>
                  <span onClick={increment} style={{ marginInline: "1rem" }}>
                    +
                  </span>
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
                sx={{ m: {lg:2,sm:0}}}
              >
                Add to Cart
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Rating
                name="read-only"
                value={product?.rating?.rate || 0}
                precision={0.5}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#FFD700 !important",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#FFD700 !important",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#ccc !important",
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product?.rating?.rate} rating
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <ToastContainer position="bottom-right" />
      </Box>
    </>
  );
};
