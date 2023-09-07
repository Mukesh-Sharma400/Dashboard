import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const renderProductSkeletons = () =>
    Array.from({ length: 8 }, (_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        width={235.71}
        height={233.59}
        sx={{ borderRadius: "0.55rem" }}
      />
    ));

  return (
    <Box m="1.5rem">
      <Header
        title="PRODUCTS"
        subtitle="Discover Your Treasure Trove of Offerings."
      />
      <Box
        mt="20px"
        pb="20px"
        display="grid"
        gridTemplateColumns={`repeat(${isNonMobile ? 4 : 1}, minmax(0, 1fr))`}
        justifyContent="space-between"
        rowGap="20px"
        columnGap={isNonMobile ? "1.33%" : "0"}
      >
        {isLoading
          ? renderProductSkeletons()
          : data.map(
              ({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat,
              }) => (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat}
                />
              )
            )}
      </Box>
    </Box>
  );
};

export default Products;
