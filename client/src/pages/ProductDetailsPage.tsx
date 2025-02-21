import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useRef } from "react";
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
import { removeProduct, updateProduct } from "../store/slices/productsSlice";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | "">("");
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editUnit, setEditUnit] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImageUrl, setEditImageUrl] = useState("");

  const hasDispatched = useRef(false);

  useEffect(() => {
    if (product && !hasDispatched.current) {
      dispatch({ type: "PRODUCT_DETAIL_OPENED", payload: product.id });
      hasDispatched.current = true;
    }
  }, [dispatch, product]);

  const viewCount = useSelector(
    (state: RootState) => state.views.counts[Number(id)] || 0
  );

  useEffect(() => {
    if (product) {
      setEditName(product.name);
      setEditDescription(product.description);
      setEditCategoryId(product.categoryId ?? "");
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
    dispatch(removeProduct(product.id));
    navigate("/");
  };

  const handleEditSave = () => {
    if (
      !editName ||
      !editDescription ||
      editCategoryId === "" ||
      editQuantity <= 0 ||
      !editUnit ||
      editPrice <= 0
    ) {
      alert(
        "Все поля обязательны для заполнения, а количество и цена должны быть больше 0"
      );
      return;
    }
    dispatch(
      updateProduct({
        id: product.id,
        name: editName,
        description: editDescription,
        categoryId: editCategoryId as number,
        quantity: editQuantity,
        unit: editUnit,
        price: editPrice,
        imageUrl: editImageUrl,
      })
    );
    setEditModalOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {categories.find((cat) => cat.id === product.categoryId)?.name}
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
            onChange={(e) => setEditCategoryId(Number(e.target.value))}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
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
