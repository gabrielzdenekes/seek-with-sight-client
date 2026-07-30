import { useState, useEffect, type MouseEvent } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Badge,
    Box,
    Button,
    Menu,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import {
    Search as SearchIcon,
    ShoppingCart as CartIcon,
    AccountCircle as AccountIcon,
    Menu as MenuIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // Assuming react-router
import type { Category } from "@/components/ui/navbar/types";
import {
    appBarSx,
    toolbarSx,
    logoSx,
    searchContainerSx,
    searchInputSx,
    actionsContainerSx,
} from "@/components/ui/navbar/styles";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";

export default function Navbar() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryAnchorEl, setCategoryAnchorEl] = useState<null | HTMLElement>(null);

    /*
     * TODO: tanstack query
     */
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const response = await get<ApiResponse<Category[]>>("/api/categories");

                if (response.success) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleOpenCategories = (event: MouseEvent<HTMLButtonElement>) => {
        setCategoryAnchorEl(event.currentTarget);
    };

    const handleCloseCategories = () => {
        setCategoryAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={appBarSx}>
            <Toolbar sx={toolbarSx}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={logoSx}
                >
                    Seek With Sight
                </Typography>

                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Button
                        color="inherit"
                        onClick={handleOpenCategories}
                        endIcon={<ArrowDownIcon />}
                        disabled={isLoadingCategories}
                    >
                        {isLoadingCategories ? <CircularProgress size={20} /> : "Categories"}
                    </Button>
                    <Menu
                        anchorEl={categoryAnchorEl}
                        open={Boolean(categoryAnchorEl)}
                        onClose={handleCloseCategories}
                        slotProps={{
                            list: {
                                "aria-labelledby": "category-button",
                            },
                        }}
                    >
                        {categories.length === 0 && !isLoadingCategories && (
                            <MenuItem disabled>No categories found</MenuItem>
                        )}
                        {categories.map((category) => (
                            <MenuItem
                                key={category.id}
                                component={Link}
                                to={`/category/${category.slug}`}
                                onClick={handleCloseCategories}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box sx={searchContainerSx}>
                    <SearchIcon color="action" />
                    <InputBase
                        placeholder="Search products, brands and categories..."
                        inputProps={{ "aria-label": "search" }}
                        sx={searchInputSx}
                    />
                </Box>

                <Box sx={actionsContainerSx}>
                    <IconButton color="inherit" aria-label="user account">
                        <AccountIcon />
                    </IconButton>

                    <IconButton color="inherit" aria-label="shopping cart">
                        <Badge badgeContent={3} color="error">
                            <CartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
