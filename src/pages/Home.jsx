import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddtoCart } from "../redux/cardSlice";
export const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.product)
    console.log("product", products);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const handleAddToCart = (product) => {
        dispatch(AddtoCart(product))
        console.log('productttt',product);
        
        navigate('/card')
    }
    const handleVeiwDetails = (product) => {
        navigate('/veiwDetails', { state: { product } })
    }
    return (
        <Container sx={{ my: 4 }}>
            <Box sx={{
                display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', }, gap: 4, justifyContent: 'center'
            }}>
                {products.map((product) => {
                    return (
                        <Card sx={{ maxWidth: 345 }} key={product.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.image}
                                    alt="green iguana"
                                    sx={{ objectFit: "contain", }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {product.title.length > 15
                                            ? `${product.title.slice(0, 15)}...`
                                            : product.title}

                                    </Typography>
                                    <Typography>{product.description.length > 35 ? `${product.description.slice(0, 35)}...` : product.description}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {product.category}
                                    </Typography>
                                    <Typography sx={{fontWeight:'bold'}}>${product.price}</Typography>
                                </CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb:2 }}>
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
                            </CardActionArea>
                            <Box sx={{ display: "flex", gap: 2, mb: 2, justifyContent: 'center' }}>

                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "#00C853",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                                <Button variant="contained"
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
                    )
                })}
            </Box>
        </Container>
    )
}