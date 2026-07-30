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
    KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import type { Category } from "@/components/ui/navbar/types";
import {
    appBarSx,
    toolbarSx,
    logoSx,
    searchContainerSx,
    searchInputSx,
    actionsContainerSx,
    nestedMenuItemSx,
} from "./styles";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";

function RecursiveCategoryItem({
    category,
    closeParentMenu,
}: {
    category: Category;
    closeParentMenu: () => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const hasChildren = category.children && category.children.length > 0;

    const handleSubMenuClick = (event: MouseEvent<HTMLElement>) => {
        if (hasChildren) {
            event.stopPropagation(); // Prevent closing parent menus
            setAnchorEl(event.currentTarget);
        } else {
            closeParentMenu();
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFinalSelection = () => {
        setAnchorEl(null);
        closeParentMenu(); // Cascade the close command all the way up the tree
    };

    if (!hasChildren) {
        return (
            <MenuItem
                component={Link}
                to={`/category/${category.slug}`}
                onClick={closeParentMenu}
            >
                {category.name}
            </MenuItem>
        );
    }

    return (
        <>
            <MenuItem onClick={handleSubMenuClick} sx={nestedMenuItemSx}>
                {category.name}
                <ArrowRightIcon fontSize="small" color="action" />
            </MenuItem>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                /* Positions the child menu to the right of the parent item */
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                {category.children!.map((child) => (
                    <RecursiveCategoryItem
                        key={child.id}
                        category={child}
                        closeParentMenu={handleFinalSelection}
                    />
                ))}
            </Menu>
        </>
    );
}


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
                const response = await get<ApiResponse<Category[]>>("/categories");

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

    const handleOpenRootCategories = (event: MouseEvent<HTMLButtonElement>) => {
        setCategoryAnchorEl(event.currentTarget);
    };

    const handleCloseRootCategories = () => {
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

                <Typography variant="h5" component={Link} to="/" sx={logoSx}>
                    E-STORE
                </Typography>

                {/* Categories Dropdown */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Button
                        color="inherit"
                        onClick={handleOpenRootCategories}
                        endIcon={<ArrowDownIcon />}
                        disabled={isLoadingCategories}
                    >
                        {isLoadingCategories ? <CircularProgress size={20} /> : "Categories"}
                    </Button>
                    <Menu
                        anchorEl={categoryAnchorEl}
                        open={Boolean(categoryAnchorEl)}
                        onClose={handleCloseRootCategories}
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
