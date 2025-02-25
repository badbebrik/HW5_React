import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/slices/productsSlice";
import { RootState } from "../../store/store";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    if (!name || !description || quantity <= 0 || !unit || price <= 0) {
      alert("Все поля обязательны (кроме категории и картинки)");
      return;
    }

    const newProductData = {
      name,
      description,
      category: categoryId || null,
      quantity,
      price,
      unit,
      imageUrl,
    };

    await dispatch(createProduct(newProductData) as any);

    setName("");
    setDescription("");
    setCategoryId("");
    setQuantity(0);
    setUnit("");
    setPrice(0);
    setImageUrl("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить товар</DialogTitle>
      <DialogContent>
        <TextField
          label="Название товара"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Описание"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          select
          label="Категория (необязательно)"
          fullWidth
          margin="normal"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          required
        />
        <TextField
          label="Единица измерения"
          fullWidth
          margin="normal"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <TextField
          label="Цена"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
        <TextField
          label="URL изображения"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
