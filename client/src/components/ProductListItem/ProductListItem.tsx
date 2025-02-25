import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/Product";

interface ProductListItemProps {
  product: Product;
  onClick: () => void;
  onDelete: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onClick,
  onDelete,
}) => {
  return (
    <Box position="relative">
      {}
      <ProductCard product={product} onClick={onClick} />
      <IconButton
        aria-label="Удалить товар"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ProductListItem;