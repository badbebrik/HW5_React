import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Product } from "../../types/Product";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}
/* 
  В задании было написано, что желательно объяснить выбор между Dialog и Modal.
  Я выбрала Dialog. Dialog реализован поверх Modal и из коробки предоставляет готовые
  компоненты и стили, засчет этого не нужно заморачиваться, кастомизировать и это увеличивает скорость разработки,
  ну и все смотрится как-то органично и консистентно
*/
const ProductModal: FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const { name, description, quantity, unit, imageUrl, categoryId } = product;
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const categoryName =
    categories.find((cat) => cat.id === categoryId)?.name || "Не указано";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          height: "60vh",
          width: "70vw",
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle>{name}</DialogTitle>
      <DialogContent dividers sx={{ overflowY: "auto" }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
          {imageUrl ? (
            <Box flex={1}>
              <img
                src={imageUrl}
                alt={name}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </Box>
          ) : (
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#f0f0f0"
              height={200}
            >
              <Typography variant="h6" color="text.secondary">
                Нет изображения
              </Typography>
            </Box>
          )}
          <Box flex={2}>
            <Typography variant="subtitle1" gutterBottom>
              Описание:
            </Typography>
            <Typography variant="body1" paragraph>
              {description || "Нет описания."}
            </Typography>
            <Typography variant="subtitle1">Категория:</Typography>
            <Typography variant="body1" paragraph>
              {categoryName}
            </Typography>
            <Typography variant="subtitle1">Количество:</Typography>
            <Typography variant="body1">
              {quantity} {unit}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
