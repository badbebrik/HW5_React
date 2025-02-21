import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_LOAD = 6;

const ProductList: FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleProducts(products.slice(0, ITEMS_PER_LOAD));
    setHasMore(products.length > ITEMS_PER_LOAD);
  }, [products]);

  const loadMoreProducts = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    const currentLength = visibleProducts.length;
    const isMore = currentLength < products.length;
    const nextResults = isMore
      ? products.slice(currentLength, currentLength + ITEMS_PER_LOAD)
      : [];

    setTimeout(() => {
      setVisibleProducts((prev) => [...prev, ...nextResults]);
      setHasMore(currentLength + nextResults.length < products.length);
      setIsLoading(false);
    }, 500);
  }, [visibleProducts.length, products, isLoading]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadMoreProducts();
      }
    },
    [loadMoreProducts, hasMore]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver, visibleProducts]);

  const handleCardClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  if (products.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="text.secondary">
          Нет товаров, соответствующих выбранным фильтрам.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <TransitionGroup component={null}>
          {visibleProducts.map((product, index) => {
            if (index === visibleProducts.length - 1) {
              return (
                <CSSTransition key={product.id} timeout={500} classNames="fade">
                  <Grid item xs={12} sm={6} md={4} ref={lastProductElementRef}>
                    <ProductCard
                      product={product}
                      onClick={() => handleCardClick(product)}
                    />
                  </Grid>
                </CSSTransition>
              );
            } else {
              return (
                <CSSTransition key={product.id} timeout={500} classNames="fade">
                  <Grid item xs={12} sm={6} md={4}>
                    <ProductCard
                      product={product}
                      onClick={() => handleCardClick(product)}
                    />
                  </Grid>
                </CSSTransition>
              );
            }
          })}
        </TransitionGroup>
      </Grid>

      {isLoading && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
