import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../store/slices/categoriesSlice";
import { Category } from "../types/Category";

const CategoriesPage: React.FC = () => {
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    await dispatch(createCategory({ name: newCategory }) as any);
    setNewCategory("");
    setModalOpen(false);
  };

  const handleDeleteCategory = async (cat: Category) => {
    await dispatch(deleteCategory(cat._id) as any);
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setEditedCategoryName(cat.name);
  };

  const handleSaveEdit = async () => {
    if (editingCategory && editedCategoryName.trim()) {
      await dispatch(
        updateCategory({
          id: editingCategory._id,
          name: editedCategoryName,
        }) as any
      );
      setEditingCategory(null);
      setEditedCategoryName("");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Управление категориями
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Добавить категорию
      </Button>

      {loading && <p>Загрузка...</p>}

      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat._id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEditCategory(cat)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteCategory(cat)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Добавить категорию</DialogTitle>
        <DialogContent>
          <TextField
            label="Название категории"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Отмена
          </Button>
          <Button
            onClick={handleAddCategory}
            color="primary"
            variant="contained"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editingCategory} onClose={() => setEditingCategory(null)}>
        <DialogTitle>Редактировать категорию</DialogTitle>
        <DialogContent>
          <TextField
            label="Название категории"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingCategory(null)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPage;
