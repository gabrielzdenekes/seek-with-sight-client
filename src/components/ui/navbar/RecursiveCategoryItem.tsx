import { useState, type MouseEvent } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowRight as ArrowRightIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import type { Category } from "@/components/ui/navbar/types";
import {
    nestedMenuItemSx,
} from "./styles";

export default function RecursiveCategoryItem({
    category,
    closeParentMenu,
}: {
    category: Category;
    closeParentMenu: () => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const hasChildren = category.children && category.children.length > 0;

    const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
        if (hasChildren) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const handleFinalSelection = () => {
        setAnchorEl(null);
        closeParentMenu();
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
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <MenuItem sx={nestedMenuItemSx}>
                {category.name}
                <ArrowRightIcon fontSize="small" color="action" />
            </MenuItem>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                disablePortal
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ pointerEvents: "none" }}
                slotProps={{
                    paper: { sx: { pointerEvents: "auto" } },
                }}
            >
                {category.children!.map((child) => (
                    <RecursiveCategoryItem
                        key={child.id}
                        category={child}
                        closeParentMenu={handleFinalSelection}
                    />
                ))}
            </Menu>
        </Box>
    );
}
