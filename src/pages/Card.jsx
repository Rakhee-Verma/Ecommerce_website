import { Box, Button, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"
import { Card } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { decrese, increase } from "../redux/cardSlice";
export const AddCard = () => {
    // const location = useLocation()
    // const cardProduct = location.state;
    const cardProduct = useSelector((state) => state.cart.cart)
    console.log(cardProduct, 'cardProduct')
    const dispatch=useDispatch()
    return (

        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection:'column',
                gap:4,
                marginLeft: '2rem'
            }}
        >
            { cardProduct.length>0 ?
           ( cardProduct.map((product) => {
                return (
                    <Card key={product.id}
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            width: { xs: "90%", sm: "80%", md: "300px" },
                            transition: "transform 0.3s ease",

                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={product.title}
                            image={product.image}
                            height="200"
                            sx={{
                                objectFit: "contain",
                                width: "100%",
                                backgroundColor: "#f9f9f9",
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
                                {product.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 1,
                                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                                }}
                            >
                                {product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description}
                            </Typography>
                            <Typography component="h5" sx={{fontWeight:"bold"}}>Price:${product.price}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', width: '35%', my: 2 }}>
                                <span onClick={()=>dispatch(decrese(product.id))}> -</span><span>{product.count}</span><span onClick={()=>dispatch(increase(product.id))}>+</span></Button>
                        </Box>

                    </Card>
                )
            })):(
                <Typography variant='h2'>No Product Available in Cart</Typography>
            )
        }

        </Box>
    )
}