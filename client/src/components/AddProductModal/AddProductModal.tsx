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
import { addProduct } from "../../store/slices/productsSlice";
import { RootState } from "../../store/store";
import { Product } from "../../types/Product";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    if (!name || !description || quantity <= 0 || !unit || price <= 0) {
      alert("Все поля обязательны для заполнения (категория опциональна)");
      return;
    }
    const newProduct: Product = {
      id: Date.now(),
      name,
      description,
      categoryId: categoryId === "" ? undefined : Number(categoryId),
      quantity,
      unit,
      price,
      imageUrl,
    };
    dispatch(addProduct(newProduct));
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
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <MenuItem value="">
            <em>Без категории</em>
          </MenuItem>
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
