import { useState, useEffect, useCallback, type MouseEvent } from "react";
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
import type { Category } from "@/components/ui/navbar/types";
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

export default function Navbar() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
    const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(null);

    const isCategoryMenuOpen = Boolean(categoryAnchorEl);

    useEffect(() => {
        let isMounted = true;

        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const response = await get<ApiResponse<Category[]>>("/categories");
                if (isMounted && response.success) {
                    setCategories(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Failed to fetch categories:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoadingCategories(false);
                }
            }
        };

        fetchCategories();

        return () => {
            isMounted = false;
        };
    }, []);

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
