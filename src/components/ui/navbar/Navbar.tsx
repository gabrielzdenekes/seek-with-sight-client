import { useState, useCallback, type MouseEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
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

import RecursiveCategoryItem from "@/components/ui/navbar/RecursiveCategoryItem";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import {
    appBarSx,
    toolbarSx,
    logoSx,
    searchContainerSx,
    searchInputSx,
    actionsContainerSx,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/features/categories/types";

async function fetchCategories(): Promise<Category[]> {
    const response = await get<ApiResponse<Category[]>>("/categories");

    return response.data;
}

export default function Navbar() {
    const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(null);
    const isCategoryMenuOpen = Boolean(categoryAnchorEl);

    const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    });

    const handleOpenRootCategories = useCallback((event: MouseEvent<HTMLElement>) => {
        setCategoryAnchorEl(event.currentTarget);
    }, []);

    const handleCloseRootCategories = useCallback(() => {
        setCategoryAnchorEl(null);
    }, []);

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

                <Typography variant="h5" component={RouterLink} to="/" sx={logoSx}>
                    SEEK WITH SIGHT
                </Typography>

                <Box
                    sx={{ display: { xs: "none", md: "block" } }}
                    onMouseEnter={handleOpenRootCategories}
                    onMouseLeave={handleCloseRootCategories}
                >
                    <Button
                        id="category-button"
                        color="inherit"
                        endIcon={
                            isLoadingCategories ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <ArrowDownIcon />
                            )
                        }
                        disabled={isLoadingCategories}
                        aria-controls={isCategoryMenuOpen ? "category-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={isCategoryMenuOpen}
                    >
                        Categories
                    </Button>

                    <Menu
                        id="category-menu"
                        anchorEl={categoryAnchorEl}
                        open={isCategoryMenuOpen}
                        onClose={handleCloseRootCategories}
                        disablePortal
                        sx={{ pointerEvents: "none" }}
                        slotProps={{
                            paper: {
                                sx: { pointerEvents: "auto" },
                            },
                            list: {
                                "aria-labelledby": "category-button",
                            },
                        }}
                    >
                        {!isLoadingCategories && categories.length === 0 && (
                            <MenuItem disabled>No categories found</MenuItem>
                        )}

                        {categories.map((category) => (
                            <RecursiveCategoryItem
                                key={category.id}
                                category={category}
                                closeParentMenu={handleCloseRootCategories}
                            />
                        ))}
                    </Menu>
                </Box>

                <Box sx={searchContainerSx}>
                    <SearchIcon color="action" />
                    <InputBase
                        placeholder="Search products, brands and categories..."
                        inputProps={{ "aria-label": "search products, brands and categories" }}
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
