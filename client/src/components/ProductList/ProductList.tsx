import { FC, useEffect, useRef, useCallback, useState } from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import { RootState } from "../../store/store";

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_LOAD = 6;

const ProductList: FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { total, loading } = useSelector((state: RootState) => state.products);

  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (products.length < total) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [products, total]);

  const loadMoreProducts = useCallback(() => {
    if (loading) return;
    dispatch(
      fetchProducts({
        offset: products.length,
        limit: ITEMS_PER_LOAD,
      }) as any
    );
    setOffset(offset + ITEMS_PER_LOAD);
  }, [loading, dispatch, products.length]);

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
  }, [handleObserver, products]);

  const handleCardClick = (product: Product) => {
    navigate(`/products/${product._id}`);
  };

  if (!loading && products.length === 0) {
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
          {products.map((product, index) => {
            if (index === products.length - 1) {
              return (
                <CSSTransition
                  key={product._id}
                  timeout={500}
                  classNames="fade"
                >
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
                <CSSTransition
                  key={product._id}
                  timeout={500}
                  classNames="fade"
                >
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

      {loading && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
