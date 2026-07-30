export const appBarSx = {
    backgroundColor: "background.paper",
    color: "text.primary",
    boxShadow: 1,
};

export const toolbarSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    py: 1,
};

export const logoSx = {
    fontWeight: 700,
    letterSpacing: "-0.5px",
    color: "primary.main",
    textDecoration: "none",
    display: { xs: "none", sm: "block" },
};

export const searchContainerSx = {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    maxWidth: "800px",
    backgroundColor: "action.hover",
    borderRadius: 1,
    px: 2,
    py: 0.5,
    border: "1px solid",
    borderColor: "divider",
    "&:hover": {
        backgroundColor: "action.selected",
    },
};

export const searchInputSx = {
    ml: 1,
    flex: 1,
};

export const actionsContainerSx = {
    display: "flex",
    alignItems: "center",
    gap: { xs: 1, md: 2 },
};

export const nestedMenuItemSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
};
