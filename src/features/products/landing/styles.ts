import { styled } from "@mui/material/styles";
import { Container, Stack } from "@mui/material";

export const StyledMainContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));

export const SectionStack = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(8),
}));
