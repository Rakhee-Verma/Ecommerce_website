import { Box, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const VeiwDetails = () => {
    const location = useLocation();
    const { product } = location.state;
    console.log(product, 'veiwproduct');

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
                        image={product.image}
                        alt={product.title}
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
                            {product.title}
                        </Typography>
                        <Typography variant="body1">{product.description}</Typography>
                        <Typography variant="p" sx={{ color: 'text.secondary', mb: 1 }}>
                            {product.category}
                        </Typography>
                        <Typography variant="h5" sx={{ pt: 2 }}>${product.price}</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                            <Rating
                                name="read-only"
                                value={product.rating.rate}
                                precision={0.5}
                                readOnly
                                sx={{ color: "#FFD700" }} 
                            />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                ({product.rating.rate}) rating
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>


        </>
    )
}