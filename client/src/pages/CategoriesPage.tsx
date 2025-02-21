import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addCategory, removeCategory, updateCategory } from '../store/slices/categoriesSlice';
import { Category } from '../types/Category';

const CategoriesPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories) as Category[];
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategory) return;
    dispatch(addCategory({ id: Date.now(), name: newCategory }));
    setNewCategory('');
    setModalOpen(false);
  };

  const handleDeleteCategory = (catId: number) => {
    const count = products.filter(p => p.categoryId === catId).length;
    if (count > 0) {
      if (window.confirm(`Данная категория принадлежит ${count} товарам, вы действительно хотите удалить её? При согласии данные категории будут помечены "Не указано".`)) {
        dispatch(removeCategory(catId));
      }
    } else {
      dispatch(removeCategory(catId));
    }
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCategoryId(cat.id);
    setEditedCategoryName(cat.name);
  };

  const handleSaveEdit = () => {
    if (editingCategoryId !== null && editedCategoryName) {
      dispatch(updateCategory({ id: editingCategoryId, name: editedCategoryName }));
      setEditingCategoryId(null);
      setEditedCategoryName('');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Управление категориями
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Добавить категорию
      </Button>
      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEditCategory(cat)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteCategory(cat.id)}>
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
          <Button onClick={handleAddCategory} color="primary" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editingCategoryId !== null} onClose={() => setEditingCategoryId(null)}>
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
          <Button onClick={() => setEditingCategoryId(null)} color="secondary">
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
