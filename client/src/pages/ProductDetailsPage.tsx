import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { deleteProduct, updateProduct } from "../store/slices/productsSlice";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p._id === id)
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<string>("");
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editUnit, setEditUnit] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImageUrl, setEditImageUrl] = useState("");

  const hasDispatchedView = useRef(false);

  const viewCount = useSelector((state: RootState) => {
    const counts = state.views.counts as Record<string, number>;
    return counts[id || ""] || 0;
  });

  useEffect(() => {
    if (product && !hasDispatchedView.current) {
      dispatch({ type: "PRODUCT_DETAIL_OPENED", payload: product._id });
      hasDispatchedView.current = true;
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (product) {
      setEditName(product.name);
      setEditDescription(product.description);
      setEditCategoryId(product.category ?? "");
      setEditQuantity(product.quantity);
      setEditUnit(product.unit);
      setEditPrice(product.price);
      setEditImageUrl(product.imageUrl || "");
    }
  }, [product]);

  if (!product) {
    return <Typography>Товар не найден</Typography>;
  }

  const handleDelete = () => {
    dispatch(deleteProduct(product._id) as any);
    navigate("/");
  };

  const handleEditSave = () => {
    if (!editName || !editDescription || !editUnit) {
      alert("Название, описание и единица измерения обязательны!");
      return;
    }
    if (editQuantity <= 0 || editPrice <= 0) {
      alert("Количество и цена должны быть больше 0");
      return;
    }

    dispatch(
      updateProduct({
        _id: product._id,
        name: editName,
        description: editDescription,
        category: editCategoryId === "" ? null : editCategoryId,
        quantity: editQuantity,
        unit: editUnit,
        price: editPrice,
        imageUrl: editImageUrl,
      }) as any
    );
    setEditModalOpen(false);
  };

  const categoryName = categories.find(
    (cat) => cat._id === product.category
  )?.name;

  return (
    <Box p={3}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {categoryName || "Без категории"}
      </Typography>
      {product.imageUrl && (
        <Box mt={2}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
      <Typography variant="body1" mt={2}>
        {product.description}
      </Typography>
      <Typography variant="h6" mt={2}>
        Количество: {product.quantity} {product.unit}
      </Typography>
      <Typography variant="h6">Цена: {product.price} ₽</Typography>
      <Typography variant="h6" mt={2} display="flex" alignItems="center">
        Просмотров: {viewCount}
        <VisibilityIcon sx={{ ml: 1 }} />
      </Typography>
      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditModalOpen(true)}
        >
          Редактировать товар
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Удалить товар
        </Button>
      </Box>

      <Dialog
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Редактировать товар</DialogTitle>
        <DialogContent>
          <TextField
            label="Название товара"
            fullWidth
            margin="normal"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <TextField
            label="Описание"
            fullWidth
            margin="normal"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
          />
          <TextField
            select
            label="Категория"
            fullWidth
            margin="normal"
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
          >
            <MenuItem value="">
              <em>Без категории</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Количество"
            type="number"
            fullWidth
            margin="normal"
            value={editQuantity}
            onChange={(e) => setEditQuantity(parseInt(e.target.value, 10))}
            required
          />
          <TextField
            label="Единица измерения"
            fullWidth
            margin="normal"
            value={editUnit}
            onChange={(e) => setEditUnit(e.target.value)}
            required
          />
          <TextField
            label="Цена"
            type="number"
            fullWidth
            margin="normal"
            value={editPrice}
            onChange={(e) => setEditPrice(parseFloat(e.target.value))}
            required
          />
          <TextField
            label="Просмотров"
            fullWidth
            margin="normal"
            value={viewCount}
            disabled
          />
          <TextField
            label="URL изображения"
            fullWidth
            margin="normal"
            value={editImageUrl}
            onChange={(e) => setEditImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetailsPage;
