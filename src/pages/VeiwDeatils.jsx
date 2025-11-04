import { Box, Button, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AddtoCart, decrese, increase } from "../redux/cardSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { styled } from "@mui/material/styles";

export const GoldRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#FFD700",
    },
    "& .MuiRating-iconEmpty": {
        color: "#ddd",
    },
});

export const VeiwDetails = () => {
    const dispatch = useDispatch()
    // const cartProducts = useSelector((state) => state.cart.cart);
    // const location = useLocation();
    // const { product } = location.state;
    // const product = useSelector((state) => state.product.selectedItem);
    // const [product, setProduct] = useState({});
    const [count, setCount] = useState(1)

    const { id } = useParams()

    console.log("id", id)

    async function getProductDetails() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
        console.log("res", res)
        return res.data;
        // setProduct(res.data)
    }

    // useEffect(() => {
    //     getProductDetails();
    // }, [])
    const { data: product } = useQuery({
        queryKey: ["item", id],
        queryFn: () => getProductDetails(id),

    });

    console.log(product, "product");

    // console.log(product, 'veiwproduct');
    // const cartItem = cartProducts.find((item) => item.id === product.id);
    // const count = cartItem ? cartItem.count : 0;
    // console.log(count, 'count');
    const increment = () => {
        setCount((prev) => prev += 1)
    }
    const decrement = () => {
        if (count > 1) {
            setCount((prev) => prev -= 1)
        }

    }

    console.log("rating", product?.rating?.rate)
    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 4,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 4,
                        my: 4,
                        py: 3,
                        px: 2,
                        width: '90%',
                        mx: 'auto',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        borderRadius: 3,
                        alignItems: 'center',
                    }}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={product?.image}
                        alt={product?.title}
                        sx={{
                            objectFit: 'contain',
                            width: { xs: '100%', sm: '250px' },
                            backgroundColor: '#f9f9f9',
                            borderRadius: 2,
                            p: 2,
                        }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {product?.title}
                        </Typography>
                        <Typography variant="body1">{product?.description}</Typography>
                        <Typography variant="p" sx={{ color: 'text.secondary', mb: 1 }}>
                            {product?.category}
                        </Typography>
                        <Box sx={{ display: 'flex', }}>
                            <Typography variant="h5" sx={{ pt: 2 }}>${product?.price * count}</Typography>
                            <Box sx={{ display: 'flex', }}>
                                <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', my: 2, marginLeft: '2rem' }}>
                                    <span onClick={decrement} style={{ marginInline: '1rem' }}> -</span><span>{count}</span><span onClick={increment} style={{ marginInline: '1rem' }}>+</span>
                                </Button>
                            </Box>
                            <Button variant="contained"
                                color="primary"
                                onClick={() => dispatch(AddtoCart(product))}
                                sx={{ m: 2 }}>Add to Cart</Button>

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
            </Box>


        </>
    )
}