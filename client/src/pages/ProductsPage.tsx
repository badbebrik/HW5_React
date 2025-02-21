import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button } from "@mui/material";
import ProductList from "../components/ProductList/ProductList";
import AddProductModal from "../components/AddProductModal/AddProductModal";
import Sidebar, { Filters } from "../components/Sidebar/Sidebar";
import { Category } from "../types/Category";
import { useSidebar } from "../context/SidebarContext";

const ProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    inStock: false,
    category: "",
  });

  const { isSidebarOpen, closeSidebar } = useSidebar();

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch = filters.name
        ? new RegExp(filters.name, "i").test(product.name)
        : true;
      const stockMatch = filters.inStock ? product.quantity > 0 : true;
      const categoryMatch = filters.category
        ? product.categoryId === filters.category
        : true;
      return nameMatch && stockMatch && categoryMatch;
    });
  }, [products, filters]);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: "100%", mx: "2%" }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddModalOpen(true)}
        >
          Добавить товар
        </Button>
      </Box>
      <ProductList products={filteredProducts} />
      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        categories={categories}
        onApplyFilters={handleApplyFilters}
      />
    </Box>
  );
};

export default ProductsPage;
