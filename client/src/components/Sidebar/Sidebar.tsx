import React, { FC, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Stack,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category } from "../../types/Category";

export interface Filters {
  name: string;
  inStock: boolean;
  category: number | "";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onApplyFilters: (filters: Filters) => void;
}

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "space-between",
  ...theme.mixins.toolbar,
}));

const Sidebar: FC<SidebarProps> = ({
  isOpen,
  onClose,
  categories,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    inStock: false,
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, inStock: e.target.checked });
  };

  const handleSelectChange = (e: SelectChangeEvent<number | "">) => {
    setFilters({ ...filters, category: e.target.value as number | "" });
  };

  const handleClearName = () => {
    setFilters({ ...filters, name: "" });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: Filters = { name: "", inStock: false, category: "" };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 320, p: 3 }}>
        <DrawerHeader>
          <Typography variant="h6">Фильтры</Typography>
          <IconButton onClick={onClose} aria-label="Закрыть фильтры">
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Название товара"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Введите название"
            fullWidth
            InputProps={{
              endAdornment: filters.name && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearName}
                    aria-label="Очистить название"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock}
                onChange={handleCheckboxChange}
              />
            }
            label="В наличии"
          />
          <Select
            value={filters.category}
            onChange={handleSelectChange}
            displayEmpty
            fullWidth
            inputProps={{ "aria-label": "Категория товара" }}
            IconComponent={ArrowDropDownIcon}
            renderValue={(selected) => {
              if (selected === 0) {
                return <em>Все категории</em>;
              } else {
                const selectedCategory = categories.find(
                  (cat) => cat.id === selected
                );
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>{selectedCategory ? selectedCategory.name : selected}</Box>
                    <IconButton
                      size="small"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({ ...filters, category: "" });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                );
              }
            }}
          >
            <MenuItem value="">
              <em>Все категории</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              fullWidth
            >
              Применить
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              fullWidth
            >
              Сбросить
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
