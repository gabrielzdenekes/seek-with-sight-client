import { useState, useMemo, useCallback, type MouseEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowRight as ArrowRightIcon } from "@mui/icons-material";

import { nestedMenuItemSx } from "./styles";
import type { Category } from "@/features/categories/category-types";

interface RecursiveCategoryItemProps {
    category: Category;
    closeParentMenu: () => void;
}

export default function RecursiveCategoryItem({
    category,
    closeParentMenu,
}: RecursiveCategoryItemProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const children = useMemo(() => category.children ?? [], [category.children]);
    const hasChildren = children.length > 0;
    const isMenuOpen = Boolean(anchorEl);

    const handleMouseEnter = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            if (hasChildren) {
                setAnchorEl(event.currentTarget);
            }
        },
        [hasChildren]
    );

    const handleMouseLeave = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleCloseAll = useCallback(() => {
        setAnchorEl(null);
        closeParentMenu();
    }, [closeParentMenu]);

    if (!hasChildren) {
        return (
            <MenuItem
                component={RouterLink}
                to={`/category/${category.slug}`}
                onClick={closeParentMenu}
            >
                {category.name}
            </MenuItem>
        );
    }

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="none"
        >
            <MenuItem
                component={category.slug ? RouterLink : "li"}
                to={category.slug ? `/category/${category.slug}` : undefined}
                onClick={handleCloseAll}
                sx={nestedMenuItemSx}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
            >
                <span>{category.name}</span>
                <ArrowRightIcon fontSize="small" color="action" />
            </MenuItem>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMouseLeave}
                disablePortal
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ pointerEvents: "none" }}
                slotProps={{
                    paper: { sx: { pointerEvents: "auto" } },
                }}
            >
                {children.map((child) => (
                    <RecursiveCategoryItem
                        key={child.id}
                        category={child}
                        closeParentMenu={handleCloseAll}
                    />
                ))}
            </Menu>
        </Box>
    );
}
