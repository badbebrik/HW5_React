import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, IconButton, Box, Button, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FaBox from "@mui/icons-material/Inventory2";
import FaWarehouse from "@mui/icons-material/Storefront";
import FaInfoCircle from "@mui/icons-material/Info";
import CategoryIcon from "@mui/icons-material/Category";
import FaUser from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

interface NavItem {
  label: string;
  icon: React.ReactElement;
  to?: string;
  onClick?: () => void;
}

const Navbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  const navItems: NavItem[] = [
    {
      label: "Товары",
      icon: <FaBox />,
      to: "/",
    },
    {
      label: "Склады",
      icon: <FaWarehouse />,
      onClick: () => {},
    },
    {
      label: "О системе",
      icon: <FaInfoCircle />,
      onClick: () => {},
    },
    {
      label: "Категории",
      icon: <CategoryIcon />,
      to: "/categories",
    },
    {
      label: "Личная страница",
      icon: <FaUser />,
      to: "/profile",
    },
  ];

  const showMenuButton = location.pathname === "/";

  return (
    <AppBar position="sticky" color="default" elevation={4}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          {}
          <RouterLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Логотип"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" color="primary">
              MyWarehouse
            </Typography>
          </RouterLink>
        </Box>

        <Box flexGrow={1} />

        <Box display="flex" gap={2} alignItems="center">
          {navItems.map((item) =>
            isMobile ? (
              <Tooltip title={item.label} key={item.label}>
                {item.to ? (
                  <Button
                    component={RouterLink}
                    to={item.to}
                    color="inherit"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </Button>
                ) : (
                  <IconButton
                    color="inherit"
                    onClick={item.onClick}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </IconButton>
                )}
              </Tooltip>
            ) : item.to ? (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.to}
                startIcon={item.icon}
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={item.label}
                startIcon={item.icon}
                color="inherit"
                onClick={item.onClick}
                sx={{ textTransform: "none" }}
              >
                {item.label}
              </Button>
            )
          )}
        </Box>

        {showMenuButton && (
          <Box display="flex" alignItems="center" ml={2}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleSidebar}
              aria-label="Открыть меню"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
